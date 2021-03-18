import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  constructor(private http: HttpClient) {}

  flightsUrl = 'http://localhost:8080/flights';

  getFlights() {
    return this.http.get(this.flightsUrl);
  }
}
