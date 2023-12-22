import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  SignInData,
  SignInResponse,
  SignUpResponse,
  businessSignUpData,
  individualSignUpData,
} from '../types';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private apiUrl = 'https://auth-endpoints-v1.onrender.com';
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  signUpIndividual(userData: individualSignUpData): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(
      `${this.apiUrl}/register/individual`,
      userData
    );
  }

  signUpBusiness(userData: businessSignUpData): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(
      `${this.apiUrl}/register/business`,
      userData
    );
  }

  verifyEmail(email: string, verificationCode: string) {
    return this.http.post(`${this.apiUrl}/verify-account`, {
      email,
      verificationCode,
    });
  }

  signIn(userData: SignInData): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${this.apiUrl}/login`, userData);
  }
}
