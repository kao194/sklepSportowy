import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginServiceService } from '../login-service.service';


@Component({
  selector: 'app-admin-login-component',
  templateUrl: './admin-login-component.component.html',
  styleUrls: ['./admin-login-component.component.css']
})
export class AdminLoginComponentComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: LoginServiceService,
    // private alertService: AlertService
  ) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    console.log('zapytano logowanie, wracam do: ' + this.returnUrl);
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
      data => {
        console.log('Zalogowano, wracam do: ' + this.returnUrl);
        this.commitInit();
        this.router.navigate([this.returnUrl]);
      },
      error => {
        // this.alertService.error(error);
        this.loading = false;
      });
  }

  commitInit() {
    console.log('commiting');
  }
}
