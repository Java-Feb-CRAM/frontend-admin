import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CredentialsDto } from '../models/CredentialsDto';

export const JWT_KEY = 'JWT';
export interface LoginResponse {
  authenticatedJwt: string;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoggedIn = false;
  loginLogoutChange: Subject<boolean> = new Subject<boolean>();
  user: any = {};

  constructor(private http: HttpClient) {
    this.loginLogoutChange.subscribe((value) => {
      this.isLoggedIn = value;
      if (this.isLoggedIn) {
        this.fetchUserDetails();
      }
    });
    this.loginLogoutChange.next(this.isJWTSet());
  }

  loginUrl = 'http://localhost:8080/users/credentails/authenticate';

  login(credentialsDto: CredentialsDto): void {
    this.http.post<LoginResponse>(this.loginUrl, credentialsDto).subscribe({
      next: (response) => {
        this.setJwt(response.authenticatedJwt);
        this.loginLogoutChange.next(true);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  logout(): void {
    localStorage.removeItem(JWT_KEY);
    this.loginLogoutChange.next(false);
  }

  private fetchUserDetails(): void {
    this.http.get('http://localhost:8080/users/me').subscribe((user) => {
      this.user = user;
    });
  }

  private isJWTSet(): boolean {
    return localStorage.getItem(JWT_KEY) !== null;
  }

  private setJwt(token: string): void {
    localStorage.setItem(JWT_KEY, token);
  }
}
