import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Airport } from '../models/Airport';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AirportService {
  constructor(private http: HttpClient) {}

  airportsUrl = 'http://localhost:8081/airports';

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

  deleteAirport(iataId: string): Observable<{}> {
    return this.http.delete(`${this.airportsUrl}/${iataId}`);
  }
}
