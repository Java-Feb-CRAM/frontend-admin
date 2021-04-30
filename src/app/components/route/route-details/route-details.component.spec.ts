import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteDetailsComponent } from './route-details.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Route } from '../../../models/Route';
import { Airport } from '../../../models/Airport';
import { By } from '@angular/platform-browser';
import { Flight } from '../../../models/Flight';
import { Airplane } from '../../../models/Airplane';
import { AirplaneType } from '../../../models/AirplaneType';
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

const route = new Route(
  1,
  new Airport('IAH', 'Houston', [], []),
  new Airport('SFO', 'San Francisco', [], []),
  [flight]
);

describe('RouteDetailsComponent', () => {
  let component: RouteDetailsComponent;
  let fixture: ComponentFixture<RouteDetailsComponent>;
  const mockDialogRef = {
    close: createSpy('close'),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RouteDetailsComponent, MatButton],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            route,
          },
        },
      ],
      imports: [MatButtonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display the route id', () => {
    const de = fixture.debugElement.query(By.css('ul > li'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain(route.id.toString());
  });

  it('should display the route origin airport', () => {
    const de = fixture.debugElement.query(By.css('ul > li ~ li'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain(route.originAirport.iataId);
  });

  it('should display the route destination airport', () => {
    const de = fixture.debugElement.query(By.css('ul > li ~ li ~ li'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain(route.destinationAirport.iataId);
  });

  it('should display the number of flights for this route', () => {
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
