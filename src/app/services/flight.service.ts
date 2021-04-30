import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Flight } from '../models/Flight';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  constructor(private readonly http: HttpClient) {
    this.flightsUrl = `${environment.apiBase}/flights`;
  }

  flightsUrl: string;

  getAllFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.flightsUrl).pipe(
      map(
        (data: Flight[]) =>
          data.map((flight) => {
            return new Flight(
              flight.id,
              flight.route,
              flight.airplane,
              flight.departureTime,
              flight.reservedSeats,
              flight.seatPrice,
              []
            );
          }),
        catchError((error) => {
          return throwError('Something went wrong!');
        })
      )
    );
  }

  createFlight(flight: Flight): Observable<Flight> {
    const createFlight = {
      routeId: flight.route.id,
      airplaneId: flight.airplane.id,
      departureTime: flight.departureTime,
      reservedSeats: flight.reservedSeats,
      seatPrice: flight.seatPrice,
    };
    return this.http.post<Flight>(this.flightsUrl, createFlight).pipe(
      map((data: Flight) => {
        return new Flight(
          data.id,
          data.route,
          data.airplane,
          data.departureTime,
          data.reservedSeats,
          data.seatPrice,
          data.bookings
        );
      })
    );
  }

  updateFlight(id: number, flight: Flight): Observable<{}> {
    const updateFlight = {
      routeId: flight.route.id,
      airplaneId: flight.airplane.id,
      departureTime: flight.departureTime,
      reservedSeats: flight.reservedSeats,
      seatPrice: flight.seatPrice,
    };
    return this.http.put(`${this.flightsUrl}/${id}`, updateFlight);
  }

  deleteFlight(id: number): Observable<{}> {
    return this.http.delete(`${this.flightsUrl}/${id}`);
  }
}
