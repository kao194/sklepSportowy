import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../login-service.service';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css']
})
export class RegisterComponentComponent {
  model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private userService: LoginServiceService) { }

  register() {
    this.loading = true;
    this.userService.create(this.model.username, this.model.password)
      .subscribe(
      data => {
        console.log('Registration successful');
        this.router.navigate(['/login']);
      },
      error => {
        // this.alertService.error(error);
        this.loading = false;
      });
  }
}
