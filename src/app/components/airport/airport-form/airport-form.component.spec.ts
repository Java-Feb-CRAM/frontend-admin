import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportFormComponent } from './airport-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import createSpy = jasmine.createSpy;
import { By } from '@angular/platform-browser';
import { Airplane } from '../../../models/Airplane';
import { AirplaneType } from '../../../models/AirplaneType';
import { Airport } from '../../../models/Airport';

const airport = new Airport('IAH', 'Houston', [], []);

describe('AirportFormComponent', () => {
  let component: AirportFormComponent;
  let fixture: ComponentFixture<AirportFormComponent>;
  const mockDialogRef = {
    close: createSpy('close'),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirportFormComponent, MatFormField, MatLabel, MatError],
      providers: [
        FormBuilder,
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
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirportFormComponent);
    component = fixture.componentInstance;
  });

  it('should display Create Airport when creating a new airplane', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('h1'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('Create');
  });

  it('should display Update Airport when updating an existing airplane', () => {
    component.data = {
      airport,
    };
    component.updating = true;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('h1'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('Update');
  });

  it('should display an error if airport iata ID is invalid', () => {
    fixture.detectChanges();
    component.airportForm.setValue({
      iataId: '',
      city: 'Houston',
    });
    component.airportForm.markAllAsTouched();
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.directive(MatError));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('required');
  });

  it('should display an error if airport city is invalid', () => {
    fixture.detectChanges();
    component.airportForm.setValue({
      iataId: 'IAH',
      city: '',
    });
    component.airportForm.markAllAsTouched();
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

  it('should close the dialog with airport when clicking the submit button', () => {
    fixture.detectChanges();
    component.airportForm.setValue({
      iataId: 'SFO',
      city: 'San Francisco',
    });
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('form'));
    de.triggerEventHandler('ngSubmit', null);
    expect(mockDialogRef.close).toHaveBeenCalledWith(
      new Airport('SFO', 'San Francisco', [], [])
    );
  });
});
