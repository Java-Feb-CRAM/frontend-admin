import { Component, Inject, OnInit } from '@angular/core';
import { Route } from '../../../models/Route';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AirportService } from '../../../services/airport.service';
import { Airport } from '../../../models/Airport';

export interface RouteFormData {
  route?: Route;
}

@Component({
  selector: 'app-route-form',
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.scss'],
})
export class RouteFormComponent implements OnInit {
  routeForm = this.fb.group({
    originAirport: [
      'AAAA',
      [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
    ],
    destinationAirport: [
      'AAAA',
      [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
    ],
  });
  updating = false;
  airports: Airport[] = [];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RouteFormData>,
    @Inject(MAT_DIALOG_DATA) public data: RouteFormData,
    private airportService: AirportService
  ) {
    if (data && data.route) {
      this.routeForm.patchValue({
        originAirport: data.route.originAirport.iataId,
        destinationAirport: data.route.destinationAirport.iataId,
      });
      this.updating = true;
    }
  }

  ngOnInit(): void {
    this.airportService.getAllAirports().subscribe((data) => {
      this.airports = data;
    });
  }

  onSubmit(): void {
    let route: Route;
    if (this.updating && this.data.route) {
      route = this.data.route;
      route.originAirport.iataId = this.routeForm.controls.originAirport.value;
      route.destinationAirport.iataId = this.routeForm.controls.destinationAirport.value;
    } else {
      route = new Route(
        0,
        new Airport(this.routeForm.controls.originAirport.value, '', [], []),
        new Airport(
          this.routeForm.controls.destinationAirport.value,
          '',
          [],
          []
        ),
        []
      );
    }
    this.dialogRef.close(route);
  }

  onCancel(): void {
    this.dialogRef.close('cancel');
  }
}
