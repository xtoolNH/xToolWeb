import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  signUpForm: FormGroup;
  error: string;
  successMessage: string;

  constructor(private fb: FormBuilder,
              private authService: AuthService) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.signUpForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
    });
  }

  signUp() {
    if (!this.signUpForm.valid) {
      this.error = 'Please fill all required field';
      return;
    } else if (this.signUpForm.get('password').value !== this.signUpForm.get('confirmPassword').value) {
      this.error = 'Password must be same';
      return;
    }
    this.authService.registerUser(this.signUpForm.value).subscribe((res: {message: string}) => {
    this.successMessage = res.message;
    }, (err: HttpErrorResponse) => {
       this.error = err.error;
    });
  }
}
