import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplaneFormComponent } from './airplane-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AirplaneTypeService } from '../../../services/airplane-type.service';
import { Observable, of } from 'rxjs';
import { AirplaneType } from '../../../models/AirplaneType';
import { Airplane } from '../../../models/Airplane';
import { MatOption } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { MatButton, MatButtonModule } from '@angular/material/button';
import createSpy = jasmine.createSpy;

const airplaneType = new AirplaneType(2, 33, []);
const airplane = new Airplane(1, airplaneType, []);

class AirplaneTypeServiceStub {
  getAllAirplaneTypes(): Observable<AirplaneType[]> {
    return of([airplaneType]);
  }
}

describe('AirplaneFormComponent', () => {
  let component: AirplaneFormComponent;
  let fixture: ComponentFixture<AirplaneFormComponent>;
  const mockDialogRef = {
    close: createSpy('close'),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AirplaneFormComponent,
        MatFormField,
        MatLabel,
        MatSelect,
        MatOption,
        MatError,
        MatButton,
      ],
      providers: [
        FormBuilder,
        {
          provide: AirplaneTypeService,
          useClass: AirplaneTypeServiceStub,
        },
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirplaneFormComponent);
    component = fixture.componentInstance;
  });

  it('should display Create Airplane when creating a new airplane', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('h1'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('Create');
  });

  it('should display Update Airplane when updating an existing airplane', () => {
    component.data = {
      airplane,
    };
    component.updating = true;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('h1'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('Update');
  });

  it('should display airplane types as select options', () => {
    fixture.detectChanges();
    const matSelectComponent: MatSelect = fixture.debugElement.query(
      By.directive(MatSelect)
    ).componentInstance;
    matSelectComponent.open();
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.mat-option-text'));
    const el1: HTMLElement = de[0].nativeElement;
    const el2: HTMLElement = de[1].nativeElement;
    expect(el1.innerText).toContain('Select');
    expect(el2.innerText).toContain(airplaneType.id.toString());
  });

  it('should display an error if airplane type is invalid', () => {
    fixture.detectChanges();
    component.airplaneForm.markAllAsTouched();
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.directive(MatError));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('required');
  });

  it('should disable submit button if form is invalid', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('button ~ button'));
    expect(de.properties['disabled']).toBeTruthy();
  });

  it('should close the dialog with cancel when clicking the cancel button', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('button'));
    de.triggerEventHandler('click', null);
    expect(mockDialogRef.close).toHaveBeenCalledWith('cancel');
  });

  it('should close the dialog with airplane when clicking the submit button', () => {
    fixture.detectChanges();
    component.airplaneForm.setValue({
      airplaneType: airplaneType.id,
    });
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('form'));
    de.triggerEventHandler('ngSubmit', null);
    expect(mockDialogRef.close).toHaveBeenCalledWith(
      new Airplane(0, new AirplaneType(airplaneType.id, 0, []), [])
    );
  });
});
