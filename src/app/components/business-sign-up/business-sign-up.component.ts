import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CustomValidators } from '../custom-validators';

@Component({
  selector: 'app-business-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './business-sign-up.component.html',
  styleUrl: './business-sign-up.component.css',
})
export class BusinessSignUpComponent implements OnInit {
  registerForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  errorMessage = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.handleRegisterationForm();
  }

  handleRegisterationForm() {
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
}
