import { Component, OnInit } from '@angular/core';
import { ProductProviderService } from '../product-provider.service';
import { Produkt } from '../produkt';
import { ProduktComponent } from '../produkt/produkt.component';
import { KoszykServiceService } from '../koszyk-service.service';

@Component({
  selector: 'app-produkty',
  templateUrl: './produkty.component.html',
  styleUrls: ['./produkty.component.css']
})
export class ProduktyComponent implements OnInit {
  service: ProductProviderService;
  koszykService: KoszykServiceService;
  listaProduktow: Array<Produkt> = [];
  zbiorKategorii: Set<String> = new Set<String>();

  constructor(service: ProductProviderService, koszykService: KoszykServiceService) {
    this.service = service;
    this.koszykService = koszykService;
  }

  ngOnInit() {
    this.aktualizujProdukty();
  }

  aktualizujProdukty() {
    this.listaProduktow = this.service.getListaProduktow();
    this.listaProduktow.forEach(s => this.zbiorKategorii.add(s.getKategoria()));
  }
}
