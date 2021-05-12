import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: '[app-row-form]',
  templateUrl: './row-form.component.html',
  styleUrls: ['./row-form.component.scss'],
})
export class RowFormComponent implements OnInit {
  // @ts-ignore
  @Input() rowGroup: FormGroup;
  // @ts-ignore
  @Input() colHeaders: FormArray;
  @Input() idx = 0;
  @Output() removeEvent = new EventEmitter<number>();
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.colHeaders.controls.forEach(() => this.addCol());
  }

  get cols(): FormArray {
    return this.rowGroup.get('cols') as FormArray;
  }

  colGroup(idx: number): FormGroup {
    return this.cols.controls[idx] as FormGroup;
  }

  addCol(): void {
    const newCol = this.initCol();
    this.cols.push(newCol);
  }

  removeCol(idx: number): void {
    this.cols.removeAt(idx);
  }

  resetCol(idx: number): void {
    this.colGroup(idx).patchValue({
      enabled: false,
    });
  }

  initCol(): FormGroup {
    return this.fb.group({
      enabled: false,
      width: 1,
      height: 1,
    });
  }
}
