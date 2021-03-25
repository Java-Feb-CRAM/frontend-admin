import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Flight } from '../models/Flight';
import { catchError } from 'rxjs/operators';
import { CreateFlightDto } from '../components/flight-plane/dto/CreateFlightDto';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  constructor(private http: HttpClient) {}

  flightsUrl = 'http://localhost:8082/flights';

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status},` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  getAllFlights(): Observable<Flight[]> {
    return this.http
      .get<Flight[]>(this.flightsUrl)
      .pipe(catchError(this.handleError));
  }

  getFlight(flightId: number): Observable<Flight> {
    return this.http
      .get<Flight>(this.flightsUrl + `/${flightId}`)
      .pipe(catchError(this.handleError));
  }

  createFlight(createFlightDto: CreateFlightDto): Observable<Flight> {
    return this.http.post<Flight>(this.flightsUrl, createFlightDto);
  }

  deleteFlight(flightId: number): Observable<{}> {
    return this.http.delete(this.flightsUrl + `/${flightId}`);
  }
}
