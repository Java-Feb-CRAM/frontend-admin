import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Airplane } from './models/Airplane';

@Injectable({
  providedIn: 'root',
})
export class AirplaneService {
  constructor(private http: HttpClient) {}
  airplanesUrl = 'http://localhost:8082/airplanes';

  getAirplanes(): Observable<Airplane[]> {
    return this.http.get<Airplane[]>(this.airplanesUrl);
  }
}
