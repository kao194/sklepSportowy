import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../login-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-panel-component',
  templateUrl: './admin-panel-component.component.html',
  styleUrls: ['./admin-panel-component.component.css']
})
export class AdminPanelComponentComponent implements OnInit {

  constructor(private loginService: LoginServiceService, private router: Router) { }

  ngOnInit() {
  }

  login() {
  }

  logout() {
    console.log('Logout');
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}
