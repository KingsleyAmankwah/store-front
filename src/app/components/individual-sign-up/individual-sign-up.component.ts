import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CustomValidators } from '../custom-validators';

@Component({
  selector: 'app-individual-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf, RouterLink],
  templateUrl: './individual-sign-up.component.html',
  styleUrl: './individual-sign-up.component.css',
})
export class IndividualSignUpComponent {
  registerForm!: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder) {
    this.buildRegisterForm();
  }

  buildRegisterForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, CustomValidators.passwordStrength()],
      ],
      confirmPassword: ['', Validators.required],
    });
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
}
