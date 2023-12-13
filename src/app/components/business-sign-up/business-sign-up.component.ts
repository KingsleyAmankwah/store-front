import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-business-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './business-sign-up.component.html',
  styleUrl: './business-sign-up.component.css',
})
export class BusinessSignUpComponent {
  registerForm!: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder) {}

  handleRegister() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
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

  showErrorMessage(): boolean {
    if (this.email && this.email.invalid && this.email.touched) {
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

    this.errorMessage = ''; // Reset the error message if no errors
    return false;
  }
}
