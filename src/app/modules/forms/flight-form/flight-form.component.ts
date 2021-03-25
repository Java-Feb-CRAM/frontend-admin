import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.scss'],
})
export class FlightFormComponent {
  flightForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.flightForm = this.formBuilder.group({
      seatPrice: [Validators.required],
      reservedSeats: [],
      departureTime: [],
      route: [],
      airplane: [],
    });
  }

  submit(): void {
    console.log(this.flightForm.value);
  }
}
