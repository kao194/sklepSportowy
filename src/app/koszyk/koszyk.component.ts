import { Component, OnInit, OnDestroy } from '@angular/core';
import { KoszykServiceService, KoszykEntry } from '../koszyk-service.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-koszyk',
  templateUrl: './koszyk.component.html',
  styleUrls: ['./koszyk.component.css']
})
export class KoszykComponent implements OnInit, OnDestroy {
  private cartSubscription: Subscription;
  localKoszyk: Array<KoszykEntry>;

  constructor(private koszykService: KoszykServiceService) { }

  ngOnInit() {
    this.cartSubscription = this.koszykService.get().subscribe((cart) => {
      this.updateKoszyka();
    });
  }

  updateKoszyka() {
    console.log(this.koszykService.koszyk);
    this.localKoszyk = this.koszykService.koszyk;
  }



  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

}
