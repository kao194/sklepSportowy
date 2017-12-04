import { Component, OnInit, OnDestroy } from '@angular/core';
import { PromocjeServiceService } from '../promocje-service.service';
import { Subscription } from 'rxjs/Subscription';
import { Produkt } from '../produkt';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-promocje-komponent',
  templateUrl: './promocje-komponent.component.html',
  styleUrls: ['./promocje-komponent.component.css']
})
export class PromocjeKomponentComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  promocje: Array<Produkt> = new Array();
  promocjeAktywne: Boolean = false;

  constructor(private promocjaService: PromocjeServiceService, private router: Router) { }

  ngOnInit() {
    this.sub = this.promocjaService.getSubscription().subscribe((cart) => {
      this.sprawdzPromocje();
    });
  }

  sprawdzPromocje() {
    this.promocje = this.promocjaService.pobierzPromocje();
    console.log(this.promocje);
    if (this.promocje) {
      this.promocjeAktywne = this.promocje.length > 0;
    }
  }

  idzDoPromocji() {
    this.router.navigate(['/promocje']);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
