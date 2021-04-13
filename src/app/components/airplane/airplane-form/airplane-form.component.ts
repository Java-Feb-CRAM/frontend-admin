import { Component, Inject, OnInit } from '@angular/core';
import { Airplane } from '../../../models/Airplane';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AirplaneType } from '../../../models/AirplaneType';
import { AirplaneTypeService } from '../../../services/airplane-type.service';

export interface AirplaneFormData {
  airplane?: Airplane;
}

@Component({
  selector: 'app-airplane-form',
  templateUrl: './airplane-form.component.html',
  styleUrls: ['./airplane-form.component.scss'],
})
export class AirplaneFormComponent implements OnInit {
  airplaneForm = this.fb.group({
    airplaneType: [-1, [Validators.required, Validators.min(0)]],
  });
  updating = false;
  airplaneTypes: AirplaneType[] = [];
  constructor(
    private readonly fb: FormBuilder,
    public dialogRef: MatDialogRef<AirplaneFormData>,
    @Inject(MAT_DIALOG_DATA) public data: AirplaneFormData,
    private readonly airplaneTypeService: AirplaneTypeService
  ) {
    if (data && data.airplane) {
      this.airplaneForm.patchValue({
        airplaneType: data.airplane.airplaneType.id,
      });
      this.updating = true;
    }
  }

  ngOnInit(): void {
    this.airplaneTypeService.getAllAirplaneTypes().subscribe((data) => {
      this.airplaneTypes = data;
    });
  }

  onSubmit(): void {
    let airplane: Airplane;
    if (this.updating && this.data.airplane) {
      airplane = this.data.airplane;
      airplane.airplaneType.id = this.airplaneForm.controls.airplaneType.value;
    } else {
      airplane = new Airplane(
        0,
        new AirplaneType(this.airplaneForm.controls.airplaneType.value, 0, []),
        []
      );
    }
    this.dialogRef.close(airplane);
  }

  onCancel(): void {
    this.dialogRef.close('cancel');
  }
}
