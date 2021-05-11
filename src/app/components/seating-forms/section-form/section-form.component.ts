import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { RowFormComponent } from '../row-form/row-form.component';
import { last } from 'rxjs/operators';

@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.scss'],
})
export class SectionFormComponent implements OnInit {
  // @ts-ignore
  @Input() sectionGroup: FormGroup;
  @Input() idx = 0;
  @Output() removeEvent = new EventEmitter<number>();

  // @ts-ignore
  @ViewChildren('row') rowComponents: QueryList<RowFormComponent>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addRow();
    this.addColHeader();
  }

  get rows(): FormArray {
    return this.sectionGroup.get('rows') as FormArray;
  }

  get colHeaders(): FormArray {
    return this.sectionGroup.get('colHeaders') as FormArray;
  }

  rowGroup(idx: number): FormGroup {
    return this.rows.controls[idx] as FormGroup;
  }

  colHeaderGroup(idx: number): FormGroup {
    return this.colHeaders.controls[idx] as FormGroup;
  }

  addRow(): void {
    console.log(this.rowComponents?.length);
    const newRow = this.initRow();
    this.rows.push(newRow);
    console.log(this.rowComponents?.length);
  }

  addColHeader(): void {
    const newColHeader = this.initColHeader();
    this.colHeaders.push(newColHeader);
  }

  addCol(): void {
    this.addColHeader();
    this.rowComponents.forEach((comp) => comp.addCol());
  }

  removeRow(idx: number): void {
    this.rows.removeAt(idx);
  }

  removeColHeader(idx: number): void {
    this.colHeaders.removeAt(idx);
  }

  removeCol(idx: number): void {
    this.removeColHeader(idx);
    this.rowComponents.forEach((comp) => comp.removeCol(idx));
  }

  initRow(): FormGroup {
    let no = 0;
    if (this.rows.length > 0) {
      console.log('!!!!!');
      console.log(this.rows);
      console.log('!!!!!!!');
      const lastRow = this.rows.controls[this.rows.controls.length - 1].get(
        'no'
      )?.value;
      console.log('LAST ROW', lastRow);
      no = lastRow + 1;
    }
    return this.fb.group({
      no,
      cols: this.fb.array([]),
    });
  }

  initColHeader(): FormGroup {
    return this.fb.group({
      symbol: ' ',
    });
  }
}
