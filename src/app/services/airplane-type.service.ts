import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AirplaneType } from '../models/AirplaneType';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AirplaneTypeService {
  constructor(private readonly http: HttpClient) {
    this.airplaneTypesUrl = `${environment.apiBase}/airplane_types`;
  }

  airplaneTypesUrl: string;

  getAllAirplaneTypes(): Observable<AirplaneType[]> {
    return this.http.get<AirplaneType[]>(this.airplaneTypesUrl).pipe(
      map(
        (data: AirplaneType[]) =>
          data.map((airplaneType) => {
            return new AirplaneType(
              airplaneType.id,
              airplaneType.maxCapacity,
              airplaneType.airplanes
            );
          }),
        catchError((error) => {
          return throwError('Something went wrong!');
        })
      )
    );
  }

  createAirplaneType(airplaneType: AirplaneType): Observable<AirplaneType> {
    return this.http
      .post<AirplaneType>(this.airplaneTypesUrl, airplaneType)
      .pipe(
        map((data: AirplaneType) => {
          return new AirplaneType(data.id, data.maxCapacity, []);
        }),
        catchError((error) => {
          return throwError('Something went wrong!');
        })
      );
  }

  updateAirplaneType(id: number, airplaneType: AirplaneType): Observable<{}> {
    return this.http.put(`${this.airplaneTypesUrl}/${id}`, airplaneType);
  }

  deleteAirplaneType(id: number): Observable<{}> {
    return this.http.delete(`${this.airplaneTypesUrl}/${id}`);
  }
}
