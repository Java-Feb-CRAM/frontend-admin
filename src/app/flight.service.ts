import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Flight } from './models/Flight';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  constructor(private http: HttpClient) {}

  flightsUrl = 'http://localhost:8080/flights';

  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.flightsUrl);
  }
}
