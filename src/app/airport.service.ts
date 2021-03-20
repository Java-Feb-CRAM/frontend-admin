import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Airport } from './models/Airport';

@Injectable({
  providedIn: 'root',
})
export class AirportService {
  constructor(private http: HttpClient) {}

  airportsUrl = 'http://localhost:8082/airports';

  getAirports(): Observable<Airport[]> {
    return this.http.get<Airport[]>(this.airportsUrl);
  }
}
