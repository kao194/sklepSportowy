var express = require('express');
var app = express();
var cors = require('cors')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var fs = require("fs");
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var User = require('./models/user');
var path = require("path");


var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(cors());

app.use(express.static(path.join(__dirname, 'dist')));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()); // parse application/json

// socket.io
io.origins(['*:*']);
io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('add-message', (message) => {
        io.emit('message', { type: 'new-message', text: message });
    });
});

// ... schemat i model
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/sklep');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'błąd połączenia...'));
db.once('open', function () {
    console.log("Works, everything OK");
    // połączenie udane!
});

app.use(session({
    secret: 'secretpass',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

var Schema = mongoose.Schema;
var Produkty = new Schema({
    nazwa: String,
    opis: String,
    cena: Number,
    kategoria: String
});
mongoose.model('Produkt', Produkty);
var Produkt = mongoose.model('Produkt');

var Zamowienia = new Schema({
    imie: String,
    nazwisko: String,
    email: String,
    adres: String,
    koszyk: String,
    przetworzone: Boolean
});
mongoose.model('Zamowienie', Zamowienia);
var Zamowienie = mongoose.model('Zamowienie');

// na ten moment taki sam schemat jak maja produkty
var Promocje = new Schema({
    nazwa: String,
    opis: String,
    cena: Number,
    kategoria: String
});
mongoose.model('Promocja', Promocje);
var Promocja = mongoose.model('Promocja');

var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// ... obsługa API
// router.get('/', function (req, res) {
//     res.end("Witam Was serdecznie na mojej stronie :)");
// })

router.route('/authenticate')
    .post(function (req, res, next) {
        console.log(req.body);

        if (req.body.logemail && req.body.logpassword) {
            User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
                if (error || !user) {
                    var err = new Error('Wrong email or password.');
                    err.status = 401;
                    return next(err);
                } else {
                    req.session.userId = user._id;
                    res.json({ status: 'OK' });
                }
            });
        } else {
            var err = new Error('All fields required.');
            err.status = 400;
            return next(err);
        }
    })

router.route('/users')
    .post(function (req, res, next) {
        var userData = {
            email: req.body.email,
            username: req.body.email,
            password: req.body.password,
            passwordConf: req.body.password,
        }

        User.create(userData, function (error, user) {
            if (error) {
                return next(error);
            } else {
                req.session.userId = user._id;
                res.json({ status: 'OK' });
            }
        });
    });

router.route('/products')
    .get(function (req, res) {
        // var Produkt = mongoose.model('Produkt');

        Produkt.find({}, null, { sort: { '_id': -1 } }, function (err, products) {
            console.log('znaleziono ' + products.length + ' wpisow');
            for (var i = 0; i < products.length; i++) {
                console.log('ID:' + products[i]._id);
            }
            res.json(products);
        });
    })
    .post(function (req, res) {
        // var Produkt = mongoose.model('Produkt');
        var produkt = new Produkt();
        produkt.nazwa = req.body.nazwa;
        produkt.opis = req.body.opis;
        produkt.cena = req.body.cena;
        produkt.kategoria = req.body.kategoria;
        produkt.save(function (err) {
            if (err) throw err;
            console.log('Zadanie zostalo zapisane.');
        });

        res.end('Zapisano rower');
    });

router.route('/zamowienia')
    .get(function (req, res) {
        // var Produkt = mongoose.model('Produkt');

        Zamowienie.find({}, null, { sort: { '_id': -1 } }, function (err, products) {
            console.log('znaleziono ' + products.length + ' wpisow');
            for (var i = 0; i < products.length; i++) {
                console.log('ID:' + products[i]._id);
            }
            res.json(products);
        });
    })
    .post(function (req, res) {
        // var Produkt = mongoose.model('Produkt');
        console.log(req.body);
        var zamowienie = new Zamowienie();
        zamowienie.imie = req.body.imie;
        zamowienie.nazwisko = req.body.nazwisko;
        zamowienie.email = req.body.email;
        zamowienie.adres = req.body.adres;
        console.log('Koszyk: ' + req.body.koszyk);
        zamowienie.koszyk = JSON.stringify(req.body.koszyk);
        zamowienie.przetworzone = false;
        zamowienie.save(function (err) {
            if (err) throw err;
            console.log('Zadanie zostalo zapisane.');
        });
        res.json({ 'ok': 'true' });
    });

router.route('/zamowienia/:zamowienie_id')
    .delete(function (req, res) {
        console.log("Usuwam: " + req.params.zamowienie_id);
        Zamowienie.remove({
            _id: req.params.zamowienie_id
        }, function (err, produkt) {
            if (err)
                res.send(err);

            res.json({ message: 'Usunieto produkt' });
        });
    });


    router.route('/promocje')
    .get(function (req, res) {
        // var Produkt = mongoose.model('Produkt');

        Promocja.find({}, null, { sort: { '_id': -1 } }, function (err, products) {
            console.log('znaleziono ' + products.length + ' wpisow');
            for (var i = 0; i < products.length; i++) {
                console.log('ID:' + products[i]._id);
            }
            res.json(products);
        });
    })
    .post(function (req, res) {
        var produkt = new Promocja();
        produkt.nazwa = req.body.nazwa;
        produkt.opis = req.body.opis;
        produkt.cena = req.body.cena;
        produkt.kategoria = req.body.kategoria;
        produkt.save(function (err) {
            if (err) throw err;
            console.log('Zadanie zostalo zapisane.');
        });
        res.json({ 'ok': 'true' });
    });

router.route('/promocje/:promocja_id')
    .delete(function (req, res) {
        console.log("Usuwam: " + req.params.promocja_id);
        Promocja.remove({
            _id: req.params.promocja_id
        }, function (err, produkt) {
            if (err)
                res.send(err);
            console.log('usunieto promocje');
            res.json({ message: 'Usunieto promocje' });
        });
    });

router.route('/products/:produkt_id')
    .get(function (req, res) {
        Produkt.findById(req.params.produkt_id, function (err, produkt) {
            if (err)
                res.send(err);
            res.json(produkt);
        });
    })
    .put(function (req, res) {
        Produkt.findById(req.params.produkt_id, function (err, produkt) {
            if (err)
                res.send(err);

            produkt.nazwa = req.body.nazwa;
            produkt.opis = req.body.opis;
            produkt.cena = req.body.cena;
            produkt.kategoria = req.body.kategoria;

            produkt.save(function (err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Produkt uaktualniony!' });
            });
        });
    })
    .delete(function (req, res) {
        Produkt.remove({
            _id: req.params.produkt_id
        }, function (err, produkt) {
            if (err)
                res.send(err);

            res.json({ message: 'Usunieto produkt' });
        });
    });


app.use('/api', router);




server.listen(5000);