import { Injectable, Output, EventEmitter } from '@angular/core';
import { Produkt } from './produkt';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { ProductProviderService } from './product-provider.service';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Zamowienie } from './zamowienie';
import { Router, ActivatedRoute } from '@angular/router';
import { ZamowieniaServiceService } from './zamowienia-service.service';

@Injectable()
export class KoszykServiceService {
  private subscribers: Array<Observer<boolean>> = new Array<Observer<boolean>>();
  private subscriptionObservable: Observable<boolean>;
  private koszyk: Array<KoszykEntry> = new Array();

  constructor(private productProviderService: ProductProviderService, private http: HttpClient, private router: Router,
    private zamowieniaService: ZamowieniaServiceService) {
    this.subscriptionObservable = new Observable<boolean>((observer: Observer<boolean>) => {
      this.subscribers.push(observer);
      observer.next(true);
      return () => {
        this.subscribers = this.subscribers.filter((obs) => obs !== observer);
      };
    });
  }

  getKoszyk(): Array<KoszykEntry> {
    // this.fromLocalStorage();
    return this.koszyk;
  }

  get() {
    return this.subscriptionObservable;
  }

  wyczyscKoszyk() {
    this.koszyk = new Array();
    this.powiadom(true);
  }

  dodajDoKoszyka(produkt: Produkt) {
    let wpis = this.koszyk.find(s => s.zamowionyProdukt.getId() === produkt.getId());
    if (wpis === undefined) {
      wpis = new KoszykEntry(produkt);
      wpis.id = produkt.getId();
      this.koszyk.push(wpis);
    }
    wpis.zwiekszIlosc();
    this.powiadom(true);
  }

  zwiekszIloscWpisu(entry: KoszykEntry) {
    entry.zwiekszIlosc();
    this.powiadom(true);
  }

  zmniejszIloscWpisu(entry: KoszykEntry) {
    entry.zmniejszIlosc();
    if (entry.getIlosc() === 0) {
      const index = this.koszyk.indexOf(entry, 0);
      if (index > -1) {
        this.koszyk.splice(index, 1);
      }
    }
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

  zapiszZamowienie(zamowienie: Zamowienie) {
    this.zamowieniaService.zapiszZamowienie(zamowienie);

    this.wyczyscKoszyk();
    this.router.navigate(['/']);
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
