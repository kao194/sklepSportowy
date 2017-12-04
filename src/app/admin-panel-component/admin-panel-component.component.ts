import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../login-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ZamowieniaServiceService } from '../zamowienia-service.service';
import { Subscription } from 'rxjs/Subscription';
import { PromocjeServiceService } from '../promocje-service.service';

@Component({
  selector: 'app-admin-panel-component',
  templateUrl: './admin-panel-component.component.html',
  styleUrls: ['./admin-panel-component.component.css']
})
export class AdminPanelComponentComponent implements OnInit {
  private cartSubscription: Subscription;
  private promocjeSubscription: Subscription;
  localZamowienia;
  promocje;

  constructor(private loginService: LoginServiceService, private router: Router,
    private zamowieniaService: ZamowieniaServiceService,
    private promocjeService: PromocjeServiceService) { }

  ngOnInit() {
    this.localZamowienia = this.zamowieniaService.pobierzZamowienia();
    this.cartSubscription = this.zamowieniaService.getSubscription().subscribe((cart) => {
      this.updateZamowienia();
    });
    this.promocjeSubscription = this.promocjeService.getSubscription().subscribe((cart) => {
      this.zaktualizujPromocje();
    });
  }

  getZamowienia() {
    return this.localZamowienia;
  }

  getPromocje() {
    console.log(this.promocje);
    return this.promocje;
  }

  zaakceptuj(zamowienieId) {
    this.zamowieniaService.zaakceptujZamowienie(zamowienieId);
  }

  zakonczPromocje(produktId) {
    this.promocjeService.zakonczPromocje(produktId);
  }

  updateZamowienia() {
    this.localZamowienia = this.zamowieniaService.pobierzZamowienia();
  }

  zaktualizujPromocje() {
    this.promocje = this.promocjeService.pobierzPromocje();
  }

  onSubmit(f) {
    console.log(f);
    if (f.valid) {
      this.promocjeService.rozpocznijPromocje(f.value.nazwa, f.value.opis, f.value.kategoria, f.value.cena);
    }
  }

  logout() {
    console.log('Logout');
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
