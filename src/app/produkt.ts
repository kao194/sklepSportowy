export class Produkt {
    static counter = 0;
    id: number;

    constructor(private nazwa: String, private opis: String,
        private cena: number, private kategoria: String) {
            this.id = Produkt.counter;
            Produkt.counter++;
    }

    getNazwa(): String {
        return this.nazwa;
    }

    getKategoria(): String {
        return this.kategoria;
    }

    getId() {
        return this.id;
    }
}
