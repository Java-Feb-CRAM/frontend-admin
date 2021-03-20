import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AirplaneType } from './models/AirplaneType';

@Injectable({
  providedIn: 'root',
})
export class AirplaneTypeService {
  constructor(private http: HttpClient) {}

  airplaneTypesUrl = 'http://localhost:8082/airplane_types';

  getAirplaneTypes(): Observable<AirplaneType[]> {
    return this.http.get<AirplaneType[]>(this.airplaneTypesUrl);
  }
}
