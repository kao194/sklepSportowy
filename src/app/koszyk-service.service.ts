import { Injectable, Output, EventEmitter } from '@angular/core';
import { Produkt } from './produkt';

@Injectable()
export class KoszykServiceService {
  @Output() zaktualizowanyKoszyk = new EventEmitter<boolean>();
  koszyk: Array<KoszykEntry> = new Array();

  constructor() { }


  dodajDoKoszyka(produkt: Produkt) {
    let wpis = this.koszyk.find(s => s.zamowionyProdukt.getId() === produkt.getId());
    if (wpis === undefined) {
      wpis = new KoszykEntry(produkt);
      wpis.id = produkt.id;
      this.koszyk.push(wpis);
    }
    console.log('Cokolwiek');
    wpis.zwiekszIlosc();
    this.zaktualizowanyKoszyk.emit(true);
    console.log('Emitted');
  }

}

class KoszykEntry {
  zamowionyProdukt: Produkt;
  id = 0;
  ilosc = 0;

  constructor(nowyProdukt: Produkt) {
    this.zamowionyProdukt = nowyProdukt;
    this.id = nowyProdukt.getId();
  }

  zwiekszIlosc() {
    this.ilosc++;
    console.log('Obecna ilosc: ' + this.ilosc);
  }

  zmniejszIlosc() {
    if (this.ilosc > 0) {
      this.ilosc--;
    }
  }
}
