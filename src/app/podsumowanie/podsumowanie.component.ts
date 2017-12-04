import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Zamowienie } from '../zamowienie';
import { KoszykServiceService } from '../koszyk-service.service';


@Component({
  selector: 'app-podsumowanie',
  templateUrl: './podsumowanie.component.html',
  styleUrls: ['./podsumowanie.component.css']
})
export class PodsumowanieComponent implements OnInit {
  constructor(private koszyk: KoszykServiceService) { }

  ngOnInit() {
  }

  onSubmit(f) {
    if (f.valid) {
      console.log(f);
      this.koszyk.zapiszZamowienie(new Zamowienie(this.koszyk.getKoszyk(), f.value.imie, f.value.nazwisko, f.value.email, f.value.adres));
      // wyczysc koszyk i przekieruj na glowna
    } else {
      console.log('Wyslano zly formularz = ignore');
    }
  }
}
