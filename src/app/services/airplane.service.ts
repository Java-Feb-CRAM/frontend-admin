import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Airplane } from '../models/Airplane';
import { CreateAirplaneDto } from '../components/flight-plane/dto/CreateAirplaneDto';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AirplaneService {
  constructor(private http: HttpClient) {}
  airplanesUrl = 'http://localhost:8082/airplanes';

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

  getAllAirplanes(): Observable<Airplane[]> {
    return this.http
      .get<Airplane[]>(this.airplanesUrl)
      .pipe(catchError(this.handleError));
  }

  getAirplane(airplaneId: number): Observable<Airplane> {
    return this.http
      .get<Airplane>(this.airplanesUrl + `/${airplaneId}`)
      .pipe(catchError(this.handleError));
  }

  createAirplane(createAirplaneDto: CreateAirplaneDto): Observable<Airplane> {
    return this.http.post<Airplane>(this.airplanesUrl, createAirplaneDto);
    // .pipe(catchError(this.handleError('createAirplane', createAirplaneDto)));
  }

  deleteAirplane(airplaneId: number): Observable<{}> {
    return this.http.delete(this.airplanesUrl + `/${airplaneId}`);
  }
}
