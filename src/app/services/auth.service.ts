import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { individualSignInData, individualSignUpData } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://auth-endpoints-v1.onrender.com';

  constructor(private http: HttpClient) {}

  signUp(userData: individualSignUpData) {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  signIn(userData: individualSignInData) {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }
}
