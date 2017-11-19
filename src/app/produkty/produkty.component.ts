import { Component, OnInit } from '@angular/core';
import { ProductProviderService } from '../product-provider.service';
import { Produkt } from '../produkt';
import { ProduktComponent } from '../produkt/produkt.component';

@Component({
  selector: 'app-produkty',
  templateUrl: './produkty.component.html',
  styleUrls: ['./produkty.component.css']
})
export class ProduktyComponent implements OnInit {
  service: ProductProviderService;
  listaProduktow: Array<Produkt> = [];
  zbiorKategorii: Set<String> = new Set<String>();

  constructor(service: ProductProviderService) {
    this.service = service;
  }

  ngOnInit() {
    this.listaProduktow = this.service.getListaProduktow();
    this.listaProduktow.forEach(s => this.zbiorKategorii.add(s.getKategoria()));
  }

}
