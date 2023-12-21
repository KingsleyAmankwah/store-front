import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SignInData, SignInResponse } from '../../types';
import Swal from 'sweetalert2';

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
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
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

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      const loginData: SignInData = {
        email: this.email?.value,
        password: this.password?.value,
      };

      this.authService.signIn(loginData).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log(response);
          const userData = response as SignInResponse;
          sessionStorage.setItem('authToken', userData.token);
          sessionStorage.setItem('userData', JSON.stringify(userData.data));

          // Navigate to another route after successful login
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error.message;

          Swal.fire({
            icon: 'error',
            text: this.errorMessage,
            timer: 5000,
          });
          console.log(error);
        },
      });

      return;
    }
  }
}
