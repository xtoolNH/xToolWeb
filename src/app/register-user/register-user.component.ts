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

  singUp() {
    if (!this.signUpForm.valid) {
      this.error = 'Please fill all required field';
      return;
    }
    this.authService.registerUser(this.signUpForm.value).subscribe((res: any) => {
      if (res.status === 200) {
        console.log(res);
      }
    }, (err: HttpErrorResponse) => {
       this.error = err.error;
    });
  }
}
