import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SeatLocation } from '../../models/SeatLocation';
import { SeatGroup } from '../../models/SeatGroup';
import { SeatLayout } from '../../models/SeatLayout';

@Component({
  selector: 'app-create-seat-layout-page',
  templateUrl: './create-seat-layout-page.component.html',
  styleUrls: ['./create-seat-layout-page.component.scss'],
})
export class CreateSeatLayoutPageComponent implements OnInit {
  // @ts-ignore
  seatLayoutForm: FormGroup;
  seatLayout: SeatLayout | null = null;
  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.seatLayoutForm = this.fb.group({
      sections: this.fb.array([]),
    });

    this.addSection();
    this.onChanges();
  }

  onChanges(): void {
    this.seatLayoutForm.valueChanges.subscribe((value) => {
      console.log('CHANGED', value);
      this.format(value);
    });
  }

  initSection(): FormGroup {
    return this.fb.group({
      name: '',
      rows: this.fb.array([]),
      colHeaders: this.fb.array([]),
    });
  }

  get sections(): FormArray {
    return this.seatLayoutForm.get('sections') as FormArray;
  }

  sectionGroup(idx: number): FormGroup {
    return this.sections.controls[idx] as FormGroup;
  }

  addSection(): void {
    const newSection = this.initSection();
    this.sections.push(newSection);
  }

  removeSection(idx: number): void {
    this.sections.removeAt(idx);
  }

  onSubmit(): void {}

  format(value: any): void {
    const groups: SeatGroup[] = [];
    value.sections.forEach((section: any) => {
      const seats: SeatLocation[] = [];
      const name = section.name;
      const rows: any[] = section.rows;
      const colHeaders: any[] = section.colHeaders;
      rows.forEach((row) => {
        if (row.cols.length !== colHeaders.length) {
          return;
        }
        for (let i = 0; i < row.cols.length; i++) {
          const col = row.cols[i];
          const symbol = colHeaders[i].symbol;
          const seat = new SeatLocation(0, 1.5, 1.5, symbol, row.no);
          seats.push(seat);
        }
      });
      const columns = colHeaders.map((colHeader) => colHeader.symbol);
      const group = new SeatGroup(0, name, columns, seats);
      groups.push(group);
    });
    this.seatLayout = new SeatLayout(0, groups);
  }
}
