import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginServiceService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const req = this.http.post('http://localhost:5000/api/authenticate', { logemail: username, logpassword: password });
    req.subscribe(
      data => {
        console.log('Zalogowano, sadd:');
        console.log(data);
        localStorage.setItem('currentUser', username);
      },
      error => {
        // this.alertService.error(error);
      });
    return req;
  }

  create(username, password) {
    return this.http.post('http://localhost:5000/api/users', { email: username, password: password });
  }

  logout() {
    console.log('logoutService:logout');
    localStorage.removeItem('currentUser');
  }
}
