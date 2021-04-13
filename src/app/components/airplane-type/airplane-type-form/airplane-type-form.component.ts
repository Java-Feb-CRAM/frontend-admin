import { Component, Inject } from '@angular/core';
import { AirplaneType } from '../../../models/AirplaneType';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface AirplaneTypeFormData {
  airplaneType?: AirplaneType;
}

@Component({
  selector: 'app-airplane-type-form',
  templateUrl: './airplane-type-form.component.html',
  styleUrls: ['./airplane-type-form.component.scss'],
})
export class AirplaneTypeFormComponent {
  airplaneTypeForm = this.fb.group({
    maxCapacity: [0, [Validators.required, Validators.min(0)]],
  });
  updating = false;
  constructor(
    private readonly fb: FormBuilder,
    public dialogRef: MatDialogRef<AirplaneTypeFormData>,
    @Inject(MAT_DIALOG_DATA) public data: AirplaneTypeFormData
  ) {
    if (data && data.airplaneType) {
      this.airplaneTypeForm.patchValue({
        maxCapacity: data.airplaneType.maxCapacity,
      });
      this.updating = true;
    }
  }

  onSubmit(): void {
    let airplaneType: AirplaneType;
    if (this.updating && this.data.airplaneType) {
      airplaneType = this.data.airplaneType;
      airplaneType.maxCapacity = this.airplaneTypeForm.controls.maxCapacity.value;
    } else {
      airplaneType = new AirplaneType(
        0,
        this.airplaneTypeForm.controls.maxCapacity.value,
        []
      );
    }
    this.dialogRef.close(airplaneType);
  }

  onCancel(): void {
    this.dialogRef.close('cancel');
  }
}
