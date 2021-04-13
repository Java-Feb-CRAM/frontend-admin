import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Route } from '../models/Route';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  constructor(private readonly http: HttpClient) {
    this.routesUrl = `${environment.apiBase}/routes`;
  }

  routesUrl: string;

  getAllRoutes(): Observable<Route[]> {
    return this.http.get<Route[]>(this.routesUrl).pipe(
      map(
        (data: Route[]) =>
          data.map((route) => {
            return new Route(
              route.id,
              route.originAirport,
              route.destinationAirport,
              route.flights
            );
          }),
        catchError((error) => {
          return throwError('Something went wrong!');
        })
      )
    );
  }

  createRoute(route: Route): Observable<Route> {
    const createRoute = {
      originAirportId: route.originAirport.iataId,
      destinationAirportId: route.destinationAirport.iataId,
    };
    return this.http.post<Route>(this.routesUrl, createRoute).pipe(
      map((data: Route) => {
        return new Route(
          data.id,
          data.originAirport,
          data.destinationAirport,
          []
        );
      }),
      catchError((error) => {
        return throwError('Something went wrong!');
      })
    );
  }

  updateRoute(id: number, route: Route): Observable<{}> {
    const updateRoute = {
      originAirportId: route.originAirport.iataId,
      destinationAirportId: route.destinationAirport.iataId,
    };
    return this.http.put(`${this.routesUrl}/${id}`, updateRoute);
  }

  deleteRoute(id: number): Observable<{}> {
    return this.http.delete(`${this.routesUrl}/${id}`);
  }
}
