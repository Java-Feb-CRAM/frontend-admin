import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RouteService } from '../../../services/route.service';
import { AirplaneService } from '../../../services/airplane.service';
import { Airplane } from '../../../models/Airplane';
import { Route } from '../../../models/Route';
import { Flight } from '../../../models/Flight';
import { Airport } from '../../../models/Airport';
import { AirplaneType } from '../../../models/AirplaneType';
import { SeatLayout } from '../../../models/SeatLayout';

export interface FlightFormData {
  flight?: Flight;
}

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.scss'],
})
export class FlightFormComponent implements OnInit {
  flightForm = this.fb.group({
    route: [-1, [Validators.required, Validators.min(0)]],
    airplane: [-1, [Validators.required, Validators.min(0)]],
    departureDate: [new Date(), [Validators.required]],
    departureTime: ['', [Validators.required]],
    reservedSeats: [0, [Validators.required, Validators.min(0)]],
    seatPrice: [0, [Validators.required, Validators.min(0)]],
  });
  updating = false;
  routes: Route[] = [];
  airplanes: Airplane[] = [];
  constructor(
    private readonly fb: FormBuilder,
    public dialogRef: MatDialogRef<FlightFormData>,
    @Inject(MAT_DIALOG_DATA) public data: FlightFormData,
    private readonly routeService: RouteService,
    private readonly airplaneService: AirplaneService
  ) {
    if (data && data.flight) {
      const date = new Date(data.flight.departureTime.getTime());
      console.log(date);
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const pm = hours > 11;
      if (pm) {
        hours -= 12;
      }
      const formattedTime = `${hours}:${minutes} ${pm ? 'PM' : 'AM'}`;
      this.flightForm.patchValue({
        route: data.flight.route.id,
        airplane: data.flight.airplane.id,
        departureDate: date,
        departureTime: formattedTime,
        reservedSeats: data.flight.reservedSeats,
        seatPrice: data.flight.seatPrice,
      });
      this.updating = true;
    }
  }

  ngOnInit(): void {
    this.routeService.getAllRoutes().subscribe((data) => {
      this.routes = data;
    });
    this.airplaneService.getAllAirplanes().subscribe((data) => {
      this.airplanes = data;
    });
  }

  onSubmit(): void {
    const date = new Date(
      this.flightForm.controls.departureDate.value.getTime()
    );
    const fullTime = this.flightForm.controls.departureTime.value;
    const fullTimeParts = fullTime.split(' ');
    const pm = fullTimeParts[1] === 'PM';
    const parts = fullTimeParts[0].split(':');
    let hours = parseInt(parts[0], 10);
    const min = parseInt(parts[1], 10);
    if (pm) {
      hours += 12;
    }
    date.setHours(hours, min);
    let flight: Flight;
    if (this.updating && this.data.flight) {
      flight = this.data.flight;
      flight.route.id = this.flightForm.controls.route.value;
      flight.airplane.id = this.flightForm.controls.airplane.value;
      flight.departureTime = date;
      flight.reservedSeats = this.flightForm.controls.reservedSeats.value;
      flight.seatPrice = this.flightForm.controls.seatPrice.value;
    } else {
      flight = new Flight(
        0,
        new Route(
          this.flightForm.controls.route.value,
          new Airport('', '', [], []),
          new Airport('', '', [], []),
          []
        ),
        new Airplane(
          this.flightForm.controls.airplane.value,
          new AirplaneType(0, 0, new SeatLayout(0, []), []),
          []
        ),
        date,
        this.flightForm.controls.reservedSeats.value,
        0,
        0,
        this.flightForm.controls.seatPrice.value,
        []
      );
    }
    this.dialogRef.close(flight);
  }

  onCancel(): void {
    this.dialogRef.close('cancel');
  }
}
