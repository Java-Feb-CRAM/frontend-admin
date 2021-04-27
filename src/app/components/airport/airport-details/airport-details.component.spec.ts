import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportDetailsComponent } from './airport-details.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Airport } from '../../../models/Airport';
import { Route } from '../../../models/Route';
import { By } from '@angular/platform-browser';
import { Airplane } from '../../../models/Airplane';
import { AirplaneType } from '../../../models/AirplaneType';
import { Flight } from '../../../models/Flight';
import createSpy = jasmine.createSpy;

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
const route = new Route(
  1,
  new Airport('ABC', 'abc', [], []),
  new Airport('DEF', 'def', [], []),
  [flight]
);
const airport = new Airport('IAH', 'Houston', [route], [route]);

describe('AirportDetailsComponent', () => {
  let component: AirportDetailsComponent;
  let fixture: ComponentFixture<AirportDetailsComponent>;
  const mockDialogRef = {
    close: createSpy('close'),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirportDetailsComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            airport,
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirportDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display airport IATA ID', () => {
    const de = fixture.debugElement.query(By.css('ul > li'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain(airport.iataId);
  });

  it('should display airport city', () => {
    const de = fixture.debugElement.query(By.css('ul > li ~ li'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain(airport.city);
  });

  it('should display number of arrival routes', () => {
    const de = fixture.debugElement.query(By.css('ul > li ~ li ~ li'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('1');
  });

  it('should display number of departures routes', () => {
    const de = fixture.debugElement.query(By.css('ul > li ~ li ~ li ~ li'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('1');
  });

  it('should close the dialog when clicking on the close button', () => {
    const de = fixture.debugElement.query(By.css('button'));
    de.triggerEventHandler('click', null);
    expect(mockDialogRef.close).toHaveBeenCalledWith('close');
  });
});
