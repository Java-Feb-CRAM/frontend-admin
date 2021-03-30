import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Flight } from '../../../models/Flight';

export interface FlightDetailsData {
  flight: Flight;
}

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss'],
})
export class FlightDetailsComponent {
  bookings = 0;
  constructor(
    public dialogRef: MatDialogRef<FlightDetailsData>,
    @Inject(MAT_DIALOG_DATA) public data: FlightDetailsData
  ) {
    this.bookings = data.flight.bookings.length;
  }

  onClose(): void {
    this.dialogRef.close('close');
  }
}
