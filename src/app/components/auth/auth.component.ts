import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  errorMessage = '';
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.handleUserAuth();
  }

  handleUserAuth() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  showErrorMessage(): boolean {
    if (this.email && this.email.invalid && this.email.touched) {
      this.errorMessage = this.email.errors?.['required']
        ? 'Email is required!'
        : this.email.errors?.['email']
        ? 'Please provide a valid email.'
        : '';
      return true;
    } else {
      this.errorMessage = '';
      return false;
    }
  }
}
