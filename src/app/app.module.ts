import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProduktyComponent } from './produkty/produkty.component';
import { ProduktComponent } from './produkt/produkt.component';
import { ProductProviderService } from './product-provider.service';

@NgModule({
  declarations: [
    AppComponent,
    ProduktyComponent,
    ProduktComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ProductProviderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
