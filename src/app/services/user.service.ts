import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { Router, UrlTree } from '@angular/router';
import { catchError, map, timeout } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export const JWT_KEY = 'JWT';

export interface UserInfo {
  id?: number;
  role?: string;
  email?: string;
  username?: string;
  givenName?: string;
  familyName?: string;
  phoneNumber?: string;
}

export interface LoginResponse {
  authenticatedJwt: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public isLoggedIn = false;
  public loginLogoutChange: Subject<boolean> = new Subject<boolean>();
  public user: UserInfo = {};

  constructor(private router: Router, private http: HttpClient) {
    this.loginLogoutChange.subscribe((value) => {
      this.isLoggedIn = value;
      if (this.isLoggedIn) {
        this.fetchUserDetails();
      }
    });
    this.loginLogoutChange.next(this.isJWTSet());
    this.currentUserUri = `${environment.apiBase}/users/current`;
    this.loginUri = `${environment.apiBase}/users/credentials/authenticate`;
    this.registrationUri = `${environment.apiBase}/users/new`;
  }

  currentUserUri: string;
  loginUri: string;
  registrationUri: string;

  login(credentials: Object): void {
    this.http.post<LoginResponse>(this.loginUri, credentials).subscribe({
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
    if (this.isJWTSet()) {
      this.router.navigate([''], { replaceUrl: true });
    }
  }

  public isUserFetchSuccess(role: string): Observable<boolean | UrlTree> {
    return this.http.get(this.currentUserUri).pipe(
      timeout(1000),
      map((response) => {
        if ((response as UserInfo).role === role) {
          this.user = response as UserInfo;
          return true;
        } else {
          this.logout();
          return this.router.parseUrl('/login');
        }
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  private fetchUserDetails(): void {
    if (Boolean(localStorage.getItem(JWT_KEY))) {
      this.http.get(this.currentUserUri).subscribe((user) => {
        this.user = user as UserInfo;
      });
    }
  }

  private isJWTSet(): boolean {
    return Boolean(localStorage.getItem(JWT_KEY));
  }

  private setJwt(token: string): void {
    localStorage.setItem(JWT_KEY, token);
  }
}
