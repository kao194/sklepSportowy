import { Component, OnInit, OnDestroy } from '@angular/core';
import { KoszykEntry, KoszykServiceService } from '../koszyk-service.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-widok-koszyka',
  templateUrl: './widok-koszyka.component.html',
  styleUrls: ['./widok-koszyka.component.css']
})
export class WidokKoszykaComponent implements OnInit, OnDestroy {
  private cartSubscription: Subscription;
  localKoszyk: Array<KoszykEntry>;
  wartoscKoszyka: number;

  constructor(private koszykService: KoszykServiceService) { }

  ngOnInit() {
    this.cartSubscription = this.koszykService.get().subscribe((cart) => {
      this.updateKoszyka();
    });
  }

  updateKoszyka() {
    this.localKoszyk = this.koszykService.koszyk;
    this.wartoscKoszyka = this.koszykService.obliczWartoscKoszyka();
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

}
