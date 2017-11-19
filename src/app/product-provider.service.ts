import { Injectable } from '@angular/core';
import { Produkt } from './produkt';
import { LISTA_PRODUKTOW } from './listaProduktow';

@Injectable()
export class ProductProviderService {
  listaProduktow: Array<Produkt> = [];

  constructor() {
    this.listaProduktow = LISTA_PRODUKTOW.map(s => new Produkt(s.nazwa, s.opis, parseFloat(s.cena), s.kategoria));
  }

  getListaProduktow(): Array<Produkt> {
    return this.listaProduktow;
  }

}
