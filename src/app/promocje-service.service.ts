import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Produkt } from './produkt';
import { Observer } from 'rxjs/Observer';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PromocjeServiceService {
  results;
  promocje: Array<Produkt>;
  private subscribers: Array<Observer<boolean>> = new Array<Observer<boolean>>();
  private subscriptionObservable: Observable<boolean>;

  private url = 'http://localhost:5000';
  private socket;

  constructor(private http: HttpClient) {
    this.subscriptionObservable = new Observable<boolean>((observer: Observer<boolean>) => {
      this.subscribers.push(observer);
      observer.next(true);
      return () => {
        this.subscribers = this.subscribers.filter((obs) => obs !== observer);
      };
    });
    this.pobierzPromocjeZBazy();
    this.getMessages().subscribe(message => {
      console.log('Nowa wiadomosc: ' + message);
      this.pobierzPromocjeZBazy();
    });
  }

  zakonczPromocje(produktId) {
    this.http.delete('http://localhost:5000/api/promocje/' + produktId).subscribe(data => {
      this.sendMessage('KoniecPromocji!');
    });
  }

  rozpocznijPromocje(nazwa, opis, kategoria, cena) {
    const obj = { 'nazwa': nazwa, 'opis': opis, 'cena': cena, 'kategoria': kategoria };
    this.http.post('http://localhost:5000/api/promocje', obj).subscribe(data => {
      this.sendMessage('PoczatekPromocji!');
    });
  }

  getSubscription() {
    return this.subscriptionObservable;
  }

  pobierzPromocje(): Array<Produkt> {
    return this.promocje;
  }

  pobierzPromocjeZBazy() {
    this.http.get('http://localhost:5000/api/promocje').subscribe(data => {
      // this.results = data['data'];
      console.log('Query for DB called');
      this.results = data;
      this.promocje = this.results.map(s => new Produkt(s._id, s.nazwa, s.opis, s.cena, s.kategoria));
      this.powiadom(true);
    });
  }

  private powiadom(cart: boolean): void {
    this.subscribers
      .forEach((sub) => {
        try {
          sub.next(cart);
        } catch (e) {
        }
      });
  }

  sendMessage(message) {
    this.socket.emit('add-message', message);
  }

  getMessages() {
    const observable = new Observable(observer => {
      this.socket = io(this.url);
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

}
