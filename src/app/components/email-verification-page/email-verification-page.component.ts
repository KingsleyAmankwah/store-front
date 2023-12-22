import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { verifyEmailResponse } from '../../types';

@Component({
  selector: 'app-email-verification-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './email-verification-page.component.html',
  styleUrl: './email-verification-page.component.css',
})
export class EmailVerificationPageComponent {
  verificationForm!: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.verificationForm = this.fb.group({
      digit1: ['', [Validators.required, Validators.pattern('\\d')]],
      digit2: ['', [Validators.required, Validators.pattern('\\d')]],
      digit3: ['', [Validators.required, Validators.pattern('\\d')]],
      digit4: ['', [Validators.required, Validators.pattern('\\d')]],
      digit5: ['', [Validators.required, Validators.pattern('\\d')]],
      digit6: ['', [Validators.required, Validators.pattern('\\d')]],
    });
  }

  onKeyup(currentInput: HTMLInputElement, nextInput: HTMLInputElement | null) {
    if (currentInput.value.length === 1 && nextInput) {
      nextInput.focus();
    }
  }

  submitCode() {
    if (this.verificationForm.valid) {
      this.isLoading = true;
      const code = Object.values(this.verificationForm.value).join('');
      const userEmail = sessionStorage.getItem('userEmail');

      if (!userEmail) {
        this.isLoading = false;
        this.errorMessage = 'User email is not available.';
        Swal.fire({
          icon: 'error',
          text: this.errorMessage,
          timer: 5000,
        });
        return;
      }

      this.authService.verifyEmail(userEmail, code).subscribe({
        next: (response) => {
          this.isLoading = false;
          const res = response as verifyEmailResponse;
          console.log(res);
          if (res.success && res.token) {
            const message = res.message.toString();
            Swal.fire({
              icon: 'success',
              title: message,
              timer: 5000,
            });
            sessionStorage.setItem('authToken', res.token);
            sessionStorage.setItem('userData', JSON.stringify(res.data));
            sessionStorage.removeItem('userEmail');

            this.router.navigate(['/dashboard']);
          } else {
            return;
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = err.error.message;
          Swal.fire({
            icon: 'error',
            text: this.errorMessage,
            timer: 5000,
          });
        },
      });
    }
  }
}
