import { KoszykEntry } from './koszyk-service.service';

export class Zamowienie {
    private koszyk: String;

    constructor(koszyk: Array<KoszykEntry>, private imie: String,
        private nazwisko: String, private email: String, private adres: String) {
        this.koszyk = this.getPrintableKoszyk(koszyk);
    }

    getPrintableKoszyk(koszyk: Array<KoszykEntry>): any {
        return koszyk.map(function (s) {
            return { 'idProduktu': s.id, 'nazwaProduktu': s.getProduktName(), 'ilosc': s.getIlosc(), 'cena': s.getWartoscWpisu() };
        });
    }
}
