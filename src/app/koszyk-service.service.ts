import { Injectable, Output, EventEmitter } from '@angular/core';
import { Produkt } from './produkt';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class KoszykServiceService {
  private subscribers: Array<Observer<boolean>> = new Array<Observer<boolean>>();
  private subscriptionObservable: Observable<boolean>;
  koszyk: Array<KoszykEntry> = new Array();

  constructor() {
    this.subscriptionObservable = new Observable<boolean>((observer: Observer<boolean>) => {
      this.subscribers.push(observer);
      observer.next(true);
      return () => {
        this.subscribers = this.subscribers.filter((obs) => obs !== observer);
      };
    });
  }

  get() {
    return this.subscriptionObservable;
  }

  dodajDoKoszyka(produkt: Produkt) {
    let wpis = this.koszyk.find(s => s.zamowionyProdukt.getId() === produkt.getId());
    if (wpis === undefined) {
      wpis = new KoszykEntry(produkt);
      wpis.id = produkt.id;
      this.koszyk.push(wpis);
    }
    wpis.zwiekszIlosc();
    this.powiadom(true);
  }

  private powiadom(cart: boolean): void {
    console.log('Size: ' + this.subscribers.length);
    this.subscribers
      .forEach((sub) => {
        try {
          sub.next(cart);
        } catch (e) {
        }
      });
  }

}

export class KoszykEntry {
  zamowionyProdukt: Produkt;
  id = 0;
  ilosc = 0;

  constructor(nowyProdukt: Produkt) {
    this.zamowionyProdukt = nowyProdukt;
    this.id = nowyProdukt.getId();
  }

  zwiekszIlosc() {
    this.ilosc++;
  }

  zmniejszIlosc() {
    if (this.ilosc > 0) {
      this.ilosc--;
    }
  }
}
