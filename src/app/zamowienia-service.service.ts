import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Zamowienie } from './zamowienie';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Produkt } from './produkt';

@Injectable()
export class ZamowieniaServiceService {
  results;
  listaZamowien;
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
    this.pobierzZamowieniaZBazy();
  }

  zapiszZamowienie(zamowienie: Zamowienie) {
    this.http.post('http://localhost:5000/api/zamowienia', zamowienie).subscribe(data => {
    });
  }

  pobierzZamowieniaZBazy() {
    this.http.get('http://localhost:5000/api/zamowienia').subscribe(data => {
      // this.results = data['data'];
      console.log('Query for DB called');
      this.results = data;
      this.powiadom(true);
    });

  }

  pobierzZamowienia() {
    return this.results;
  }

  getSubscription() {
    return this.subscriptionObservable;
  }

  zaakceptujZamowienie(zamowienieId) {
    console.log('Zaakceptowano zamowienie o id: ' + zamowienieId);
    console.log('Zaakceptowano zamowienie o id: zamowienia/' + zamowienieId);
    this.http.delete('http://localhost:5000/api/zamowienia/' + zamowienieId).subscribe(data => {
      this.pobierzZamowieniaZBazy();
    });
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
}
