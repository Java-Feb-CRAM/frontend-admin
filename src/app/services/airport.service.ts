import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Airport } from '../models/Airport';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AirportService {
  constructor(private http: HttpClient) {
    this.airportsUrl = `${environment.apiBase}/airports`;
  }

  airportsUrl: string;

  getAllAirports(): Observable<Airport[]> {
    return this.http.get<Airport[]>(this.airportsUrl).pipe(
      map(
        (data: Airport[]) =>
          data.map((airport) => {
            return new Airport(
              airport.iataId,
              airport.city,
              airport.arrivals,
              airport.departures
            );
          }),
        catchError((error) => {
          return throwError('Something went wrong!');
        })
      )
    );
  }

  createAirport(airport: Airport): Observable<Airport> {
    return this.http.post<Airport>(this.airportsUrl, airport).pipe(
      map((data: Airport) => {
        return new Airport(data.iataId, data.city, [], []);
      }),
      catchError((error) => {
        return throwError('Something went wrong!');
      })
    );
  }

  updateAirport(iataId: string, airport: Airport): Observable<{}> {
    return this.http.put(`${this.airportsUrl}/${iataId}`, airport);
  }

  deleteAirport(iataId: string): Observable<{}> {
    return this.http.delete(`${this.airportsUrl}/${iataId}`);
  }
}
