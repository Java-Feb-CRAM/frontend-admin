import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Route } from '../../../models/Route';

export interface RouteDetailsData {
  route: Route;
}

@Component({
  selector: 'app-route-details',
  templateUrl: './route-details.component.html',
  styleUrls: ['./route-details.component.scss'],
})
export class RouteDetailsComponent {
  flights = 0;
  constructor(
    public dialogRef: MatDialogRef<RouteDetailsData>,
    @Inject(MAT_DIALOG_DATA) public data: RouteDetailsData
  ) {
    this.flights = data.route.flights.length;
  }

  onClose(): void {
    this.dialogRef.close('close');
  }
}
