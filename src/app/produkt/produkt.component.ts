import { Component, OnInit, Input } from '@angular/core';
import { Produkt } from '../produkt';
import { KoszykServiceService } from '../koszyk-service.service';

@Component({
  selector: 'app-produkt',
  templateUrl: './produkt.component.html',
  styleUrls: ['./produkt.component.css']
})
export class ProduktComponent implements OnInit {
  @Input() produkt: Produkt;
  constructor(private koszykService: KoszykServiceService) { }

  ngOnInit() {
  }

  zamowTowar(produkt: Produkt) {
    this.koszykService.dodajDoKoszyka(produkt);
    console.log(produkt);
  }
}
