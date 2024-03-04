import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomValidators } from '../custom-validators';
import { AuthService } from '../../services/auth.service';
import { SignUpResponse, individualSignUpData } from '../../types';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-individual-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf, RouterLink],
  templateUrl: './individual-sign-up.component.html',
  styleUrl: './individual-sign-up.component.css',
})
export class IndividualSignUpComponent {
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
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, CustomValidators.passwordStrength()],
      ],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
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
    if (this.firstName && this.firstName.invalid && this.firstName.touched) {
      this.errorMessage = this.firstName.errors?.['required']
        ? 'First name is required!'
        : '';
      return true;
    } else if (
      this.lastName &&
      this.lastName.invalid &&
      this.lastName.touched
    ) {
      this.errorMessage = this.lastName.errors?.['required']
        ? 'Last name is required!'
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
    } else {
      this.errorMessage = '';
      return false;
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const signUpData: individualSignUpData = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
      };

      this.authService.signUpIndividual(signUpData).subscribe({
        next: (response) => {
          this.isLoading = false;
          const res = response as SignUpResponse;

          if (res.message) {
            const message = res.message.toString();
            Swal.fire({
              icon: 'success',
              title: message,
              timer: 5000,
            });
          }
          sessionStorage.setItem('userEmail', signUpData.email);
          this.router.navigate(['/verify-email']);
        },
        error: (error) => {
          const message = error.error.message.toString();

          Swal.fire({
            icon: 'error',
            title: message,
            timer: 5000,
          });
          this.isLoading = false;
        },
      });
    }
  }
}
