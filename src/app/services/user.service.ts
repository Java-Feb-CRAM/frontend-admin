import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CredentialsDto } from '../models/CredentialsDto';

export const JWT_KEY="JWT"
export interface LoginResponse{ 
  authenticatedJwt: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

    loginUrl = 'http://localhost:8080/users/credentails/authenticate';

    login(credentialsDto: CredentialsDto): void {
      this.http.post<LoginResponse>(this.loginUrl, credentialsDto).subscribe({
        next: (response) => { this.setJwt(response.authenticatedJwt) },
        error: (error) => {console.error(error)}
      })
      
      console.log(Boolean(localStorage.getItem(JWT_KEY)))
      
    }

    loggedIn(): boolean {
      return Boolean(localStorage.getItem(JWT_KEY)) 
    }

    logout(): void {
      localStorage.removeItem(JWT_KEY)
    }

    setJwt(token: string): void {
      localStorage.setItem(JWT_KEY, token)
    }
}
