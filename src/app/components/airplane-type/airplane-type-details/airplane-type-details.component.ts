import { Component, Inject, OnInit } from '@angular/core';
import { AirplaneType } from '../../../models/AirplaneType';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface AirplaneTypeDetailsData {
  airplaneType: AirplaneType;
}

@Component({
  selector: 'app-airplane-type-details',
  templateUrl: './airplane-type-details.component.html',
  styleUrls: ['./airplane-type-details.component.scss'],
})
export class AirplaneTypeDetailsComponent {
  airplanes = 0;
  constructor(
    public dialogRef: MatDialogRef<AirplaneTypeDetailsData>,
    @Inject(MAT_DIALOG_DATA) public data: AirplaneTypeDetailsData
  ) {
    this.airplanes = data.airplaneType.airplanes.length;
  }

  onClose(): void {
    this.dialogRef.close('close');
  }
}
