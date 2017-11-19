import { Component, OnInit, Input } from '@angular/core';
import { Produkt } from '../produkt';

@Component({
  selector: 'app-produkt',
  templateUrl: './produkt.component.html',
  styleUrls: ['./produkt.component.css']
})
export class ProduktComponent implements OnInit {
  @Input() produkt: Produkt;
  constructor() { }

  ngOnInit() {
  }

}
