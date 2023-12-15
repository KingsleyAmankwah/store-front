import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomValidators } from '../custom-validators';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-change-password-page',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './change-password-page.component.html',
  styleUrl: './change-password-page.component.css',
})
export class ChangePasswordPageComponent {
  changePasswordForm!: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      password: [
        '',
        [Validators.required, CustomValidators.passwordStrength()],
      ],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get password() {
    return this.changePasswordForm.get('password');
  }

  get confirmPassword() {
    return this.changePasswordForm.get('confirmPassword');
  }

  passwordsMatch() {
    return (
      this.confirmPassword?.touched &&
      this.password?.value === this.confirmPassword?.value
    );
  }

  passwordsMismatch() {
    return (
      this.changePasswordForm.get('confirmPassword')?.touched &&
      this.password?.value !== this.confirmPassword?.value
    );
  }

  showErrorMessage(): boolean {
    if (this.passwordsMismatch()) {
      this.errorMessage = 'The two passwords do not match!';
      return true;
    } else {
      this.errorMessage = '';
      return false;
    }
  }

  changePassword() {
    if (this.changePasswordForm.valid) {
      console.log(`Hello world`);
    }
  }
}
