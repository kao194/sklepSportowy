import { Injectable, EventEmitter, Output } from '@angular/core';
import { Produkt } from './produkt';
import { LISTA_PRODUKTOW } from './listaProduktow';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class ProductProviderService {
  listaProduktow: Array<Produkt> = [];
  results;
  private subscribers: Array<Observer<boolean>> = new Array<Observer<boolean>>();
  private subscriptionObservable: Observable<boolean>;

  constructor(private http: HttpClient) {
    this.subscriptionObservable = new Observable<boolean>((observer: Observer<boolean>) => {
      this.subscribers.push(observer);
      observer.next(true);
      return () => {
        this.subscribers = this.subscribers.filter((obs) => obs !== observer);
      };
    });
    // http://localhost:2403/products
    http.get('http://localhost:5000/api/products').subscribe(data => {
      // this.results = data['data'];
      console.log('Query for DB called');
      this.results = data;
      this.listaProduktow = this.results.map(s => new Produkt(s._id, s.nazwa, s.opis, parseFloat(s.cena), s.kategoria));
      this.powiadom(true);
    });
    // this.listaProduktow = LISTA_PRODUKTOW.map(s => new Produkt(s.nazwa, s.opis, parseFloat(s.cena), s.kategoria));
  }

  getSubscription() {
    return this.subscriptionObservable;
  }

  private powiadom(cart: boolean): void {
    console.log('PowiadomProduktyCalled: ' + this.subscribers.length);
    this.subscribers
      .forEach((sub) => {
        try {
          sub.next(cart);
        } catch (e) {
        }
      });
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
