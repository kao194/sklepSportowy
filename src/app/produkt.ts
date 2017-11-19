export class Produkt {
    constructor(private nazwa: String, private opis: String,
        private cena: number, private kategoria: String) {
    }

    getNazwa(): String {
        return this.nazwa;
    }

    getKategoria(): String {
        return this.kategoria;
    }
}
