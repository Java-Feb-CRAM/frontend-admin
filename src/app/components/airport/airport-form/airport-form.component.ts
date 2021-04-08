import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Airport } from '../../../models/Airport';

export interface AirportFormData {
  airport?: Airport;
}

@Component({
  selector: 'app-airport-form',
  templateUrl: './airport-form.component.html',
  styleUrls: ['./airport-form.component.scss'],
})
export class AirportFormComponent {
  airportForm = this.fb.group({
    iataId: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3),
        Validators.pattern(/[A-Z]{3}/g),
      ],
    ],
    city: ['', [Validators.required, Validators.maxLength(45)]],
  });
  updating = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AirportFormData>,
    @Inject(MAT_DIALOG_DATA) public data: AirportFormData
  ) {
    if (data && data.airport) {
      this.airportForm.patchValue({
        iataId: data.airport.iataId,
        city: data.airport.city,
      });
      this.updating = true;
      this.airportForm.controls.iataId.disable();
    }
  }

  onSubmit(): void {
    let airport: Airport;
    if (this.updating && this.data.airport) {
      airport = this.data.airport;
      airport.city = this.airportForm.controls.city.value;
    } else {
      airport = new Airport(
        this.airportForm.controls.iataId.value,
        this.airportForm.controls.city.value,
        [],
        []
      );
    }
    console.log(airport);
    this.dialogRef.close(airport);
  }

  onCancel(): void {
    this.dialogRef.close('cancel');
  }
}
