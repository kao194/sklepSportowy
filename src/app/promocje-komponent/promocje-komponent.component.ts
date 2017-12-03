import { Component, OnInit, OnDestroy } from '@angular/core';
import { PromocjeServiceService } from '../promocje-service.service';

@Component({
  selector: 'app-promocje-komponent',
  templateUrl: './promocje-komponent.component.html',
  styleUrls: ['./promocje-komponent.component.css'],
  providers: [PromocjeServiceService]
})
export class PromocjeKomponentComponent implements OnInit, OnDestroy {
  messages = [];
  connection;
  message;
  ngModel;

  constructor(private chatService: PromocjeServiceService) { }

  sendMessage() {
    console.log(this.message);
    console.log(this.ngModel);
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  ngOnInit() {
    this.connection = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);
    });
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

}
