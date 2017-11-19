import { Component, OnInit } from '@angular/core';
import { KoszykServiceService } from '../koszyk-service.service';

@Component({
  selector: 'app-koszyk',
  templateUrl: './koszyk.component.html',
  styleUrls: ['./koszyk.component.css']
})
export class KoszykComponent implements OnInit {

  constructor(private koszykService: KoszykServiceService) { }

  ngOnInit() {
  }

  zaktualizujKoszyk(event) {
    alert('Update koszyka');
  }

}
