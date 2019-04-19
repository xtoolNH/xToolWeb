import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router
  ) {}

  ngOnInit() {
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService
      .login(this.loginForm.value)
      .pipe(first())
      .subscribe(
        (res: HttpResponse<any>) => {
        sessionStorage.setItem('x_tool_user', res.headers.get('x-auth-token'));
        this.route.navigate(['/dashboard']);
        },
        (err: HttpErrorResponse) => {
          this.errorMessage = err.error;
          this.loginForm.get('password').setValue('');
          this.authService.logout();
        }
      );
  }

  // get username() {
  //   return this.loginForm.get('username');
  // }

  // get password() {
  //   return this.loginForm.get('password');
  // }

}