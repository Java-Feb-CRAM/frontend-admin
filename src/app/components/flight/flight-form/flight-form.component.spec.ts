import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightFormComponent } from './flight-form.component';
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
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import {
  NgxMaterialTimepickerComponent,
  NgxMaterialTimepickerModule,
} from 'ngx-material-timepicker';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { Observable, of } from 'rxjs';
import { Route } from '../../../models/Route';
import { Airplane } from '../../../models/Airplane';
import { Airport } from '../../../models/Airport';
import { AirplaneType } from '../../../models/AirplaneType';
import { RouteService } from '../../../services/route.service';
import { AirplaneService } from '../../../services/airplane.service';
import { By } from '@angular/platform-browser';
import { Flight } from '../../../models/Flight';
import createSpy = jasmine.createSpy;
import { MatButton, MatButtonModule } from '@angular/material/button';

const route = new Route(
  1,
  new Airport('SFO', 'San Francisco', [], []),
  new Airport('LAX', 'Los Agneles', [], []),
  []
);

const airplane = new Airplane(3, new AirplaneType(1, 45, []), []);

const flight = new Flight(4, route, airplane, new Date(), 3, 9.99, []);

class RouteServiceStub {
  getAllRoutes(): Observable<Route[]> {
    return of([route]);
  }
}

class AirplaneServiceStub {
  getAllAirplanes(): Observable<Airplane[]> {
    return of([airplane]);
  }
}

describe('FlightFormComponent', () => {
  let component: FlightFormComponent;
  let fixture: ComponentFixture<FlightFormComponent>;
  const mockDialogRef = {
    close: createSpy('close'),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FlightFormComponent,
        MatFormField,
        MatLabel,
        MatSelect,
        MatOption,
        MatDatepicker,
        NgxMaterialTimepickerComponent,
        MatButton,
      ],
      providers: [
        FormBuilder,
        {
          provide: RouteService,
          useClass: RouteServiceStub,
        },
        {
          provide: AirplaneService,
          useClass: AirplaneServiceStub,
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
        MatInputModule,
        MatSelectModule,
        MatNativeDateModule,
        MatDatepickerModule,
        NgxMaterialTimepickerModule,
        MatButtonModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightFormComponent);
    component = fixture.componentInstance;
  });

  it('should display Create Flight when creating a new airplane', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('h1'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('Create');
  });

  it('should display Update Flight when updating an existing airplane', () => {
    component.data = {
      flight,
    };
    component.updating = true;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('h1'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('Update');
  });

  it('should display routes as select options', () => {
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
    expect(el2.innerText).toContain(route.originAirport.iataId);
    expect(el2.innerText).toContain(route.destinationAirport.iataId);
  });

  it('should display airplanes as select options', () => {
    fixture.detectChanges();
    const matSelectComponent: MatSelect = fixture.debugElement.queryAll(
      By.directive(MatSelect)
    )[1].componentInstance;
    matSelectComponent.open();
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.mat-option-text'));
    const el1: HTMLElement = de[0].nativeElement;
    const el2: HTMLElement = de[1].nativeElement;
    expect(el1.innerText).toContain('Select');
    expect(el2.innerText).toContain(airplane.id.toString());
  });

  it('should display an error if route is invalid', () => {
    fixture.detectChanges();
    component.flightForm.markAllAsTouched();
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.directive(MatError));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('required');
  });

  it('should display an error if airplane is invalid', () => {
    fixture.detectChanges();
    component.flightForm.markAllAsTouched();
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.directive(MatError))[1];
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('required');
  });

  it('should display an error if reserved seats is invalid', () => {
    fixture.detectChanges();
    component.flightForm.setValue({
      route: -1,
      airplane: -1,
      departureDate: new Date(),
      departureTime: '',
      reservedSeats: '',
      seatPrice: 0,
    });
    component.flightForm.markAllAsTouched();
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.directive(MatError))[2];
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('required');
  });

  it('should display an error if seat price is invalid', () => {
    fixture.detectChanges();
    component.flightForm.setValue({
      route: -1,
      airplane: -1,
      departureDate: new Date(),
      departureTime: '',
      reservedSeats: '',
      seatPrice: '',
    });
    component.flightForm.markAllAsTouched();
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.directive(MatError))[3];
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
    const de = fixture.debugElement.query(By.css('#cancel'));
    de.triggerEventHandler('click', null);
    expect(mockDialogRef.close).toHaveBeenCalledWith('cancel');
  });

  it('should close the dialog with flight when clicking the submit button', () => {
    fixture.detectChanges();
    component.flightForm.setValue({
      route: 1,
      airplane: 3,
      departureDate: new Date(),
      departureTime: '2:00 PM',
      reservedSeats: 2,
      seatPrice: 9.99,
    });
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('form'));
    de.triggerEventHandler('ngSubmit', null);
    const date = new Date();
    date.setHours(14, 0, 0, 12);
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
