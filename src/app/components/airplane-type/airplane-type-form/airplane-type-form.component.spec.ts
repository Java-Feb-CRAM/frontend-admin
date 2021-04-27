import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplaneTypeFormComponent } from './airplane-type-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { AirplaneType } from '../../../models/AirplaneType';
import { Airplane } from '../../../models/Airplane';
import createSpy = jasmine.createSpy;

const airplaneType = new AirplaneType(2, 33, []);
const airplane = new Airplane(1, airplaneType, []);

describe('AirplaneTypeFormComponent', () => {
  let component: AirplaneTypeFormComponent;
  let fixture: ComponentFixture<AirplaneTypeFormComponent>;
  const mockDialogRef = {
    close: createSpy('close'),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AirplaneTypeFormComponent,
        MatFormField,
        MatLabel,
        MatError,
        MatInput,
      ],
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
    fixture = TestBed.createComponent(AirplaneTypeFormComponent);
    component = fixture.componentInstance;
  });

  it('should display Create Airplane Type when creating a new airplane type', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('h1'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('Create');
  });

  it('should display Update Airplane Type when updating an existing airplane type', () => {
    component.data = {
      airplaneType,
    };
    component.updating = true;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('h1'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('Update');
  });

  it('should display an error if max capacity is invalid', () => {
    fixture.detectChanges();
    component.airplaneTypeForm.setValue({
      maxCapacity: '',
    });
    component.airplaneTypeForm.markAllAsTouched();
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.directive(MatError));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('required');
  });

  it('should disable submit button if form is invalid', () => {
    fixture.detectChanges();
    component.airplaneTypeForm.setValue({
      maxCapacity: '',
    });
    component.airplaneTypeForm.markAllAsTouched();
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

  it('should close the dialog with airplane type when clicking the submit button', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('form'));
    de.triggerEventHandler('ngSubmit', null);
    expect(mockDialogRef.close).toHaveBeenCalledWith(
      new AirplaneType(0, 0, [])
    );
  });
});
