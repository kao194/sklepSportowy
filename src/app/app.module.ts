import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Import HttpClientModule from @angular/common/http
import {HttpClientModule} from '@angular/common/http';
// documentation says only the above is needed...
import { HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProduktyComponent } from './produkty/produkty.component';
import { ProduktComponent } from './produkt/produkt.component';
import { ProductProviderService } from './product-provider.service';
import { KoszykComponent } from './koszyk/koszyk.component';
import { KoszykServiceService } from './koszyk-service.service';
import { WidokKoszykaComponent } from './widok-koszyka/widok-koszyka.component';
import { AppRoutingModule } from './app.routing';
import { PodsumowanieComponent } from './podsumowanie/podsumowanie.component';

@NgModule({
  declarations: [
    AppComponent,
    ProduktyComponent,
    ProduktComponent,
    KoszykComponent,
    WidokKoszykaComponent,
    PodsumowanieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ProductProviderService, KoszykServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
