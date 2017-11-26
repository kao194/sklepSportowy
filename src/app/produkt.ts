export class Produkt {

    constructor(private id, private nazwa: String, private opis: String,
        private cena: number, private kategoria: String) { }

    getNazwa(): String {
        return this.nazwa;
    }

    getKategoria(): String {
        return this.kategoria;
    }

    getId() {
        return this.id;
    }

    getCena() {
        return this.cena;
    }
}
