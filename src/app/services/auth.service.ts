import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInData, businessSignUpData, individualSignUpData } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://auth-endpoints-v1.onrender.com';

  constructor(private http: HttpClient) {}

  signUpIndividual(userData: individualSignUpData) {
    return this.http.post(`${this.apiUrl}/register/individual`, userData);
  }

  signUpBusiness(userData: businessSignUpData) {
    return this.http.post(`${this.apiUrl}/register/business`, userData);
  }

  verifyEmail(email: string, verificationCode: string) {
    return this.http.post(`${this.apiUrl}/verify-account`, {
      email,
      verificationCode,
    });
  }

  signIn(userData: SignInData) {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }
}
