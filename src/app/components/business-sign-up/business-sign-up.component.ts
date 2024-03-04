import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomValidators } from '../custom-validators';
import { AuthService } from '../../services/auth.service';
import { SignUpResponse, businessSignUpData } from '../../types';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-business-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './business-sign-up.component.html',
  styleUrl: './business-sign-up.component.css',
})
export class BusinessSignUpComponent {
  registerForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, CustomValidators.passwordStrength()],
      ],
      confirmPassword: [
        '',
        [Validators.required, CustomValidators.passwordStrength()],
      ],
    });
  }

  get name() {
    return this.registerForm.get('name');
  }
  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  passwordsMatch() {
    return (
      this.confirmPassword?.touched &&
      this.password?.value === this.confirmPassword?.value
    );
  }

  passwordsMismatch() {
    return (
      this.registerForm.get('confirmPassword')?.touched &&
      this.password?.value !== this.confirmPassword?.value
    );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  showErrorMessage(): boolean {
    if (this.name && this.name.invalid && this.name.touched) {
      this.errorMessage = this.name.errors?.['required']
        ? 'Business name is required!'
        : '';
      return true;
    } else if (this.email && this.email.invalid && this.email.touched) {
      this.errorMessage = this.email.errors?.['required']
        ? 'Email is required!'
        : this.email.errors?.['email']
        ? 'Please provide a valid email.'
        : '';
      return true;
    } else if (this.passwordsMismatch()) {
      this.errorMessage = 'Passwords must match!';
      return true;
    }

    this.errorMessage = '';
    return false;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;

      const signUpData: businessSignUpData = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      };

      this.authService.signUpBusiness(signUpData).subscribe({
        next: (response) => {
          console.info(response);
          this.isLoading = false;
          const res = response as SignUpResponse;

          if (res.message) {
            const message = res.message.toString();
            Swal.fire({
              icon: 'success',
              title: message,
              timer: 5000,
            });
            sessionStorage.setItem('userEmail', signUpData.email);
            this.router.navigate(['/verify-email']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error.message;

          Swal.fire({
            icon: 'error',
            text: err.error.message,
            timer: 5000,
          });
        },
      });
    }
  }
}
