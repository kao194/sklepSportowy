import { Component, OnInit } from '@angular/core';
import { ProductProviderService } from '../product-provider.service';
import { Produkt } from '../produkt';
import { ProduktComponent } from '../produkt/produkt.component';
import { KoszykServiceService } from '../koszyk-service.service';
import { Subscription } from 'rxjs/Subscription';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from '../pipes';
import { PromocjeServiceService } from '../promocje-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-promocyjne-produkty',
  templateUrl: './promocyjne-produkty.component.html',
  styleUrls: ['./promocyjne-produkty.component.css']
})
export class PromocyjneProduktyComponent implements OnInit {
  listaProduktow: Array<Produkt> = [];
  zbiorKategorii: Set<String> = new Set<String>();
  private produktSub: Subscription;

  filteredCategories: Set<String> = new Set();

  constructor(private service: PromocjeServiceService, private koszykService: KoszykServiceService, private router: Router) {
    this.service = service;
    this.koszykService = koszykService;
  }

  ngOnInit() {
    this.produktSub = this.service.getSubscription().subscribe((cart) => {
      this.aktualizujProdukty();
    });
  }

  powrotDoSklepu() {
    this.router.navigate(['/']);
  }

  aktualizujProdukty() {
    console.log('Called zaktualizujProdukty');
    this.listaProduktow = this.service.pobierzPromocje();
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
