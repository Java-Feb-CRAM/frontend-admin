import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Route } from '../models/Route';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  constructor(private http: HttpClient) {}

  routesUrl = 'http://localhost:8082/routes';

  getRoutes(): Observable<Route[]> {
    return this.http.get<Route[]>(this.routesUrl);
  }
}
