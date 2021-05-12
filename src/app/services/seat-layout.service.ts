import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { SeatLayout } from '../models/SeatLayout';
import { map } from 'rxjs/operators';
import { SeatGroup } from '../models/SeatGroup';

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
          const groups = seatLayout.seatGroups.map((group: any) => {
            const cols = group.columns.split('');
            return new SeatGroup(
              group.id,
              group.name,
              cols,
              group.seatLocations
            );
          });
          return new SeatLayout(seatLayout.id, groups);
        })
      )
    );
  }

  createSeatLayout(seatLayout: SeatLayout): Observable<SeatLayout> {
    return this.http.post<SeatLayout>(this.seatLayoutsUrl, seatLayout);
  }

  deleteSeatLayout(id: number): Observable<{}> {
    return this.http.delete(`${this.seatLayoutsUrl}/${id}`);
  }
}
