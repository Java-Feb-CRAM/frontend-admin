import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Airport } from '../../../models/Airport';

export interface AirportDetailsData {
  airport: Airport;
}

@Component({
  selector: 'app-airport-details',
  templateUrl: './airport-details.component.html',
  styleUrls: ['./airport-details.component.scss'],
})
export class AirportDetailsComponent {
  departingFlights = 0;
  arrivingFlights = 0;
  constructor(
    public dialogRef: MatDialogRef<AirportDetailsData>,
    @Inject(MAT_DIALOG_DATA) public data: AirportDetailsData
  ) {
    data.airport.departures.forEach((route) => {
      this.departingFlights += route.flights.length;
    });
    data.airport.arrivals.forEach((route) => {
      this.arrivingFlights += route.flights.length;
    });
  }

  onClose(): void {
    this.dialogRef.close('close');
  }
}
