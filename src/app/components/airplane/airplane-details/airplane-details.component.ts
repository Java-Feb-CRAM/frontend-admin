import { Component, Inject, OnInit } from '@angular/core';
import { Airplane } from '../../../models/Airplane';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface AirplaneDetailsData {
  airplane: Airplane;
}

@Component({
  selector: 'app-airplane-details',
  templateUrl: './airplane-details.component.html',
  styleUrls: ['./airplane-details.component.scss'],
})
export class AirplaneDetailsComponent {
  flights = 0;
  constructor(
    public dialogRef: MatDialogRef<AirplaneDetailsData>,
    @Inject(MAT_DIALOG_DATA) public data: AirplaneDetailsData
  ) {
    this.flights = data.airplane.flights.length;
  }

  onClose(): void {
    this.dialogRef.close('close');
  }
}
