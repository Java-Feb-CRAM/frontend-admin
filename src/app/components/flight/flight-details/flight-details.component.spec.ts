import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDetailsComponent } from './flight-details.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Flight } from '../../../models/Flight';
import { Route } from '../../../models/Route';
import { Airport } from '../../../models/Airport';
import { Airplane } from '../../../models/Airplane';
import { AirplaneType } from '../../../models/AirplaneType';
import { By } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import createSpy = jasmine.createSpy;
import { MatButton, MatButtonModule } from '@angular/material/button';

const flight = new Flight(
  1,
  new Route(
    2,
    new Airport('SFO', 'San Francisco', [], []),
    new Airport('LAX', 'Los Angeles', [], []),
    []
  ),
  new Airplane(3, new AirplaneType(2, 200, []), []),
  new Date(),
  4,
  19.99,
  []
);

describe('FlightDetailsComponent', () => {
  let component: FlightDetailsComponent;
  let fixture: ComponentFixture<FlightDetailsComponent>;
  const mockDialogRef = {
    close: createSpy('close'),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, MatButtonModule],
      declarations: [FlightDetailsComponent, MatButton],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            flight,
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display flight id', () => {
    const de = fixture.debugElement.query(By.css('ul > li'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain(flight.id.toString());
  });
  it('should display flight origin airport', () => {
    const de = fixture.debugElement.query(By.css('ul > li ~ li'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain(flight.route.originAirport.iataId);
  });
  it('should display flight destination airport', () => {
    const de = fixture.debugElement.query(By.css('ul > li ~ li ~ li'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain(flight.route.destinationAirport.iataId);
  });
  it('should display flight airplane', () => {
    const de = fixture.debugElement.query(By.css('ul > li ~ li ~ li ~ li'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain(flight.airplane.id.toString());
  });
  it('should display flight departure', () => {
    const de = fixture.debugElement.query(
      By.css('ul > li ~ li ~ li ~ li ~ li')
    );
    const el: HTMLElement = de.nativeElement;
    const pipe = new DatePipe('en-US');
    const transformed =
      pipe.transform(flight.departureTime, 'long') ||
      flight.departureTime.toISOString();
    expect(el.innerText).toContain(transformed);
  });
  it('should display flight reserved seats', () => {
    const de = fixture.debugElement.query(
      By.css('ul > li ~ li ~ li ~ li ~ li ~ li')
    );
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain(flight.reservedSeats.toString());
  });
  it('should display flight seat price', () => {
    const de = fixture.debugElement.query(
      By.css('ul > li ~ li ~ li ~ li ~ li ~ li ~ li')
    );
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain(flight.seatPrice.toFixed(2));
  });
  it('should display flight bookings', () => {
    const de = fixture.debugElement.query(
      By.css('ul > li ~ li ~ li ~ li ~ li ~ li ~ li ~ li')
    );
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain(flight.bookings.length.toString());
  });

  it('should close the dialog when clicking on the close button', () => {
    const de = fixture.debugElement.query(By.css('button'));
    de.triggerEventHandler('click', null);
    expect(mockDialogRef.close).toHaveBeenCalledWith('close');
  });
});
