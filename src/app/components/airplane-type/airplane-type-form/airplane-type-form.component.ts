import { Component, Inject, OnInit } from '@angular/core';
import { AirplaneType } from '../../../models/AirplaneType';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SeatLayoutService } from '../../../services/seat-layout.service';
import { SeatLayout } from '../../../models/SeatLayout';

export interface AirplaneTypeFormData {
  airplaneType?: AirplaneType;
}

@Component({
  selector: 'app-airplane-type-form',
  templateUrl: './airplane-type-form.component.html',
  styleUrls: ['./airplane-type-form.component.scss'],
})
export class AirplaneTypeFormComponent implements OnInit {
  airplaneTypeForm = this.fb.group({
    seatLayout: [-1, [Validators.required, Validators.min(0)]],
  });
  updating = false;
  seatLayouts: SeatLayout[] = [];
  constructor(
    private readonly fb: FormBuilder,
    public dialogRef: MatDialogRef<AirplaneTypeFormData>,
    @Inject(MAT_DIALOG_DATA) public data: AirplaneTypeFormData,
    private readonly seatLayoutService: SeatLayoutService
  ) {
    if (data && data.airplaneType) {
      this.airplaneTypeForm.patchValue({
        seatLayout: data.airplaneType.seatLayout.id,
      });
      this.updating = true;
    }
  }

  ngOnInit(): void {
    this.seatLayoutService.getAllSeatLayouts().subscribe((data) => {
      this.seatLayouts = data;
    });
  }

  onSubmit(): void {
    console.log(this.airplaneTypeForm);
    let airplaneType: AirplaneType;
    if (this.updating && this.data.airplaneType) {
      airplaneType = this.data.airplaneType;
      airplaneType.maxCapacity = 0;
      airplaneType.seatLayout =
        this.seatLayouts.find(
          (l) => l.id === this.airplaneTypeForm.controls.seatLayout.value
        ) ||
        new SeatLayout(this.airplaneTypeForm.controls.seatLayout.value, []);
    } else {
      airplaneType = new AirplaneType(
        0,
        0,
        this.seatLayouts.find(
          (l) => l.id === this.airplaneTypeForm.controls.seatLayout.value
        ) ||
          new SeatLayout(this.airplaneTypeForm.controls.seatLayout.value, []),
        []
      );
    }
    this.dialogRef.close(airplaneType);
  }

  onCancel(): void {
    this.dialogRef.close('cancel');
  }
}
