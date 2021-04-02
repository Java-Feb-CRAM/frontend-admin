import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { CredentialsDto } from '../models/CredentialsDto';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {
    this.loginLogoutChange.subscribe((value) => {
      this.isLoggedIn = value;
      if (this.isLoggedIn) {
        this.fetchUserDetails();
      }
    });
    this.loginLogoutChange.next(this.isJWTSet());
  }

  loginUrl = 'http://localhost:8080/users/credentials/authenticate';

  login(credentialsDto: CredentialsDto): void {
    this.http.post<LoginResponse>(this.loginUrl, credentialsDto).subscribe({
      next: (response) => {
        this.setJwt(response.authenticatedJwt);
        this.loginLogoutChange.next(true);
        this.router.navigate([''], { replaceUrl: true });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  logout(): void {
    localStorage.removeItem(JWT_KEY);
    this.loginLogoutChange.next(false);
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  checkRedirect(): void {
    if(this.isJWTSet())
    {
      this.router.navigate([''], { replaceUrl: true });
    }
  }

  private fetchUserDetails(): void {
    this.http.post('http://localhost:8080/users/current', '').subscribe((user) => {
      this.user = user;
    });
  }

  private isJWTSet(): boolean {
    return Boolean(localStorage.getItem(JWT_KEY));
  }

  private setJwt(token: string): void {
    localStorage.setItem(JWT_KEY, token);
  }
}
