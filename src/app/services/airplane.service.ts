import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Airplane } from '../models/Airplane';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AirplaneService {
  constructor(private http: HttpClient) {}
  airplanesUrl = 'http://localhost:8081/airplanes';

  getAllAirplanes(): Observable<Airplane[]> {
    return this.http.get<Airplane[]>(this.airplanesUrl).pipe(
      map(
        (data: Airplane[]) =>
          data.map((airplane) => {
            return new Airplane(
              airplane.id,
              airplane.airplaneType,
              airplane.flights
            );
          }),
        catchError((error) => {
          return throwError('Something went wrong!');
        })
      )
    );
  }

  createAirplane(airplane: Airplane): Observable<Airplane> {
    const createAirplane = {
      airplaneTypeId: airplane.airplaneType.id,
    };
    return this.http.post<Airplane>(this.airplanesUrl, createAirplane).pipe(
      map((data: Airplane) => {
        return new Airplane(data.id, data.airplaneType, []);
      }),
      catchError((error) => {
        return throwError('Something went wrong!');
      })
    );
  }

  updateAirplane(id: number, airplane: Airplane): Observable<{}> {
    const updateAirplane = {
      airplaneTypeId: airplane.airplaneType.id,
    };
    return this.http.put(`${this.airplanesUrl}/${id}`, updateAirplane);
  }

  deleteAirplane(id: number): Observable<{}> {
    return this.http.delete(`${this.airplanesUrl}/${id}`);
  }
}
