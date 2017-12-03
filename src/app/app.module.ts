import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Import HttpClientModule from @angular/common/http
import {HttpClientModule} from '@angular/common/http';
// documentation says only the above is needed...
import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ProduktyComponent } from './produkty/produkty.component';
import { ProduktComponent } from './produkt/produkt.component';
import { ProductProviderService } from './product-provider.service';
import { KoszykComponent } from './koszyk/koszyk.component';
import { KoszykServiceService } from './koszyk-service.service';
import { WidokKoszykaComponent } from './widok-koszyka/widok-koszyka.component';
import { AppRoutingModule } from './app.routing';
import { PodsumowanieComponent } from './podsumowanie/podsumowanie.component';
import { PromocjeKomponentComponent } from './promocje-komponent/promocje-komponent.component';
import { AdminPanelComponentComponent } from './admin-panel-component/admin-panel-component.component';
import { AdminLoginComponentComponent } from './admin-login-component/admin-login-component.component';
import { LoginServiceService } from './login-service.service';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { AuthGuard } from './auth-guard';

@NgModule({
  declarations: [
    AppComponent,
    ProduktyComponent,
    ProduktComponent,
    KoszykComponent,
    WidokKoszykaComponent,
    PodsumowanieComponent,
    PromocjeKomponentComponent,
    AdminPanelComponentComponent,
    AdminLoginComponentComponent,
    RegisterComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ProductProviderService, KoszykServiceService, LoginServiceService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
