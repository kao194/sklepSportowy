import { Component, OnInit, OnDestroy } from '@angular/core';
import { KoszykEntry, KoszykServiceService } from '../koszyk-service.service';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-widok-koszyka',
  templateUrl: './widok-koszyka.component.html',
  styleUrls: ['./widok-koszyka.component.css']
})
export class WidokKoszykaComponent implements OnInit, OnDestroy {
  private cartSubscription: Subscription;
  localKoszyk: Array<KoszykEntry>;
  wartoscKoszyka: number;

  constructor(private koszykService: KoszykServiceService, private router: Router) { }

  ngOnInit() {
    this.cartSubscription = this.koszykService.get().subscribe((cart) => {
      this.updateKoszyka();
    });
  }

  kontynuuj() {
    this.router.navigate(['/']);
  }

  podsumuj() {
    this.router.navigate(['/podsumowanie']);
  }

  updateKoszyka() {
    this.localKoszyk = this.koszykService.getKoszyk();
    this.wartoscKoszyka = this.koszykService.obliczWartoscKoszyka();
  }

  zwiekszIlosc(entry: KoszykEntry) {
    this.koszykService.zwiekszIloscWpisu(entry);
  }

  zmniejszIlosc(entry: KoszykEntry) {
    this.koszykService.zmniejszIloscWpisu(entry);
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

}
