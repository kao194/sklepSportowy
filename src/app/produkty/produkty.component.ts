import { Component, OnInit } from '@angular/core';
import { ProductProviderService } from '../product-provider.service';
import { Produkt } from '../produkt';
import { ProduktComponent } from '../produkt/produkt.component';
import { KoszykServiceService } from '../koszyk-service.service';
import { Subscription } from 'rxjs/Subscription';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from '../pipes';

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
  private produktSub: Subscription;

  filteredCategories: Set<String> = new Set();

  constructor(service: ProductProviderService, koszykService: KoszykServiceService) {
    this.service = service;
    this.koszykService = koszykService;
  }

  ngOnInit() {
    this.produktSub = this.service.getSubscription().subscribe((cart) => {
      this.aktualizujProdukty();
    });
  }

  aktualizujProdukty() {
    console.log('Called zaktualizujProdukty');
    this.listaProduktow = this.service.getListaProduktow();
    this.listaProduktow.forEach(s => this.zbiorKategorii.add(s.getKategoria()));
  }

  getFilteredListaProduktow() {
    return this.listaProduktow.filter(s => this.zbiorKategorii.has(s.getKategoria()));
  }

  filterCategory(e, value) {
    console.log(value);

    if (e.target.checked === true) {
      this.filteredCategories.add(value);
    } else {
      this.filteredCategories.delete(value);
    }
  }
}
