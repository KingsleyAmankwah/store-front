import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-email-verification-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './email-verification-page.component.html',
  styleUrl: './email-verification-page.component.css',
})
export class EmailVerificationPageComponent implements OnInit {
  verificationForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

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

  submitCode() {
    if (this.verificationForm.valid) {
      const code = Object.values(this.verificationForm.value).join('');
      // Handle the verification logic with the code
      console.log(code); // Or send this code to your backend
    }
  }
}
