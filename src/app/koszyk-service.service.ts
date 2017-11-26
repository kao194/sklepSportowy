import { Injectable, Output, EventEmitter } from '@angular/core';
import { Produkt } from './produkt';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { ProductProviderService } from './product-provider.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Injectable()
export class KoszykServiceService {
  private subscribers: Array<Observer<boolean>> = new Array<Observer<boolean>>();
  private subscriptionObservable: Observable<boolean>;
  private koszyk: Array<KoszykEntry> = new Array();

  constructor(private productProviderService: ProductProviderService) {
    this.subscriptionObservable = new Observable<boolean>((observer: Observer<boolean>) => {
      this.subscribers.push(observer);
      observer.next(true);
      return () => {
        this.subscribers = this.subscribers.filter((obs) => obs !== observer);
      };
    });
  }

  // fromLocalStorage() {
  //   console.log('ngOnInit serwisu');

  //   // this.koszyk = JSON.parse(localStorage.getItem('Koszyk'))
  //   //   .map(s => new KoszykEntry(this.productProviderService.getProduktById(s.zamowionyProdukt.id), s.ilosc));
  //   console.log(localStorage.getItem('Koszyk'));
  //   if (localStorage.getItem('Koszyk') !== null) {
  //     JSON.parse(localStorage.getItem('Koszyk'))
  //       .forEach(s => console.log(this.productProviderService.getProduktById(s.zamowionyProdukt.id), s.ilosc));
  //   } else {
  //     console.log('Pusty koszyk');
  //   }
  // }


  getKoszyk(): Array<KoszykEntry> {
    // this.fromLocalStorage();
    return this.koszyk;
  }

  get() {
    return this.subscriptionObservable;
  }

  dodajDoKoszyka(produkt: Produkt) {
    let wpis = this.koszyk.find(s => s.zamowionyProdukt.getId() === produkt.getId());
    if (wpis === undefined) {
      wpis = new KoszykEntry(produkt);
      wpis.id = produkt.getId();
      this.koszyk.push(wpis);
    }
    wpis.zwiekszIlosc();
    // localStorage.setItem('Koszyk', JSON.stringify(this.koszyk));
    // this.fromLocalStorage();
    this.powiadom(true);
  }

  obliczWartoscKoszyka() {
    let suma = 0;
    this.koszyk.forEach(element => {
      suma += element.getWartoscWpisu();
    });
    return suma;
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

  constructor(nowyProdukt: Produkt, ilosc: number = 0) {
    this.zamowionyProdukt = nowyProdukt;
    this.id = nowyProdukt.getId();
    this.ilosc = ilosc;
  }

  getIlosc() {
    return this.ilosc;
  }

  getProduktName() {
    return this.zamowionyProdukt.getNazwa();
  }

  getProduktCena() {
    return this.zamowionyProdukt.getCena();
  }

  getWartoscWpisu() {
    return this.getProduktCena() * this.getIlosc();
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
