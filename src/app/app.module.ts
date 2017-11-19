import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProduktyComponent } from './produkty/produkty.component';
import { ProduktComponent } from './produkt/produkt.component';
import { ProductProviderService } from './product-provider.service';
import { KoszykComponent } from './koszyk/koszyk.component';
import { KoszykServiceService } from './koszyk-service.service';
import { WidokKoszykaComponent } from './widok-koszyka/widok-koszyka.component';

@NgModule({
  declarations: [
    AppComponent,
    ProduktyComponent,
    ProduktComponent,
    KoszykComponent,
    WidokKoszykaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ProductProviderService, KoszykServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
