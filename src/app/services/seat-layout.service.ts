import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { SeatLayout } from '../models/SeatLayout';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SeatLayoutService {
  constructor(private readonly http: HttpClient) {
    this.seatLayoutsUrl = `${environment.apiBase}/seat_layouts`;
  }
  seatLayoutsUrl: string;

  getAllSeatLayouts(): Observable<SeatLayout[]> {
    return this.http.get<SeatLayout[]>(this.seatLayoutsUrl).pipe(
      map((data: SeatLayout[]) =>
        data.map((seatLayout) => {
          return new SeatLayout(seatLayout.id, seatLayout.seatGroups);
        })
      )
    );
  }
}
