import { Injectable, EventEmitter, Output } from '@angular/core';
import { Produkt } from './produkt';
import { LISTA_PRODUKTOW } from './listaProduktow';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductProviderService {
  @Output()
  aktualizuj: EventEmitter<number> = new EventEmitter<number>();
  listaProduktow: Array<Produkt> = [];
  results;

  constructor(private http: HttpClient) {
    // http://localhost:2403/products
    http.get('http://localhost:5000/api/products').subscribe(data => {
      // this.results = data['data'];
      this.results = data;
      this.listaProduktow = this.results.map(s => new Produkt(s._id, s.nazwa, s.opis, parseFloat(s.cena), s.kategoria));
    });
    // this.listaProduktow = LISTA_PRODUKTOW.map(s => new Produkt(s.nazwa, s.opis, parseFloat(s.cena), s.kategoria));
    this.aktualizuj.emit(1);
  }

  getListaProduktow(): Array<Produkt> {
    return this.listaProduktow;
  }

  getProduktById(id): Produkt {
    // console.log('GetProduktByID called: ' + id);
    // this.listaProduktow.forEach(s => console.log(s.getId()));
    return this.listaProduktow.filter(s => s.getId() === id)[0];
  }

}
