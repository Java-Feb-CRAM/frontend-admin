import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteFormComponent } from './route-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { Airport } from '../../../models/Airport';
import { AirportService } from '../../../services/airport.service';
import { MatOption } from '@angular/material/core';
import { By } from '@angular/platform-browser';
import { Route } from '../../../models/Route';
import createSpy = jasmine.createSpy;
import { MatButton, MatButtonModule } from '@angular/material/button';

const airportLAX = new Airport('LAX', 'Los Angeles', [], []);
const airportSFO = new Airport('SFO', 'San Francisco', [], []);

class AirportServiceStub {
  getAllAirports(): Observable<Airport[]> {
    return of([airportLAX, airportSFO]);
  }
}

const route = new Route(3, airportLAX, airportSFO, []);

describe('RouteFormComponent', () => {
  let component: RouteFormComponent;
  let fixture: ComponentFixture<RouteFormComponent>;
  const mockDialogRef = {
    close: createSpy('close'),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RouteFormComponent,
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
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
        {
          provide: AirportService,
          useClass: AirportServiceStub,
        },
      ],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatButtonModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteFormComponent);
    component = fixture.componentInstance;
  });

  it('should display Create Route when creating a new airplane', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('h1'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('Create');
  });

  it('should display Update Route when updating an existing airplane', () => {
    component.data = {
      route,
    };
    component.updating = true;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('h1'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('Update');
  });

  it('should display airports as options for origin airport', () => {
    fixture.detectChanges();
    const matSelectComponent: MatSelect = fixture.debugElement.query(
      By.directive(MatSelect)
    ).componentInstance;
    matSelectComponent.open();
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.mat-option-text'));
    const el1: HTMLElement = de[0].nativeElement;
    const el2: HTMLElement = de[1].nativeElement;
    const el3: HTMLElement = de[2].nativeElement;
    expect(el1.innerText).toContain('Select');
    expect(el2.innerText).toContain(airportLAX.iataId);
    expect(el3.innerText).toContain(airportSFO.iataId);
  });

  it('should display airports as options for destination airport', () => {
    fixture.detectChanges();
    const matSelectComponent: MatSelect = fixture.debugElement.queryAll(
      By.directive(MatSelect)
    )[1].componentInstance;
    matSelectComponent.open();
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.mat-option-text'));
    const el1: HTMLElement = de[0].nativeElement;
    const el2: HTMLElement = de[1].nativeElement;
    const el3: HTMLElement = de[2].nativeElement;
    expect(el1.innerText).toContain('Select');
    expect(el2.innerText).toContain(airportLAX.iataId);
    expect(el3.innerText).toContain(airportSFO.iataId);
  });

  it('should display an error if origin airport is invalid', () => {
    fixture.detectChanges();
    component.routeForm.setValue({
      originAirport: '',
      destinationAirport: 'LAX',
    });
    component.routeForm.markAllAsTouched();
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.directive(MatError));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('required');
  });

  it('should display an error if destination airport is invalid', () => {
    fixture.detectChanges();
    component.routeForm.setValue({
      originAirport: 'LAX',
      destinationAirport: '',
    });
    component.routeForm.markAllAsTouched();
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
    component.routeForm.setValue({
      originAirport: 'LAX',
      destinationAirport: 'SFO',
    });
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('form'));
    de.triggerEventHandler('ngSubmit', null);
    expect(mockDialogRef.close).toHaveBeenCalledWith(
      new Route(
        0,
        new Airport('LAX', '', [], []),
        new Airport('SFO', '', [], []),
        []
      )
    );
  });
});
