import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-reset-password-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password-page.component.html',
  styleUrl: './reset-password-page.component.css',
})
export class ResetPasswordPageComponent implements OnInit {
  resetPasswordForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.resetPasswordForm.get('email');
  }

  sendMail() {
    console.log(`Hello World!`);
  }
}
