import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginForm) {
    const authUrl = 'http://localhost:3000/api/users/authenticate';
    return this.http.post(authUrl, loginForm);
  }
  logout() {}

  registerUser(signUpForm) {
    return this.http.post('http://localhost:3000/api/users/registerUser', signUpForm);
  }
}
