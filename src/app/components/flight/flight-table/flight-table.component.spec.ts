import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightTableComponent } from './flight-table.component';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { By } from '@angular/platform-browser';
import { TableEventType } from '../../../interfaces/TableEventType';
import { Airplane } from '../../../models/Airplane';
import { AirplaneType } from '../../../models/AirplaneType';
import { Flight } from '../../../models/Flight';
import { Route } from '../../../models/Route';
import { Airport } from '../../../models/Airport';
import { DatePipe } from '@angular/common';

const flights = [
  new Flight(
    1,
    new Route(
      2,
      new Airport('SFO', 'San Francisco', [], []),
      new Airport('LAX', 'Los Angeles', [], []),
      []
    ),
    new Airplane(3, new AirplaneType(2, 34, []), []),
    new Date(),
    2,
    3,
    []
  ),
];

describe('FlightTableComponent', () => {
  let component: FlightTableComponent;
  let fixture: ComponentFixture<FlightTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FlightTableComponent,
        MatFormField,
        MatLabel,
        MatIcon,
        MatPaginator,
        MatSort,
        MatTable,
      ],
      imports: [
        FormsModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightTableComponent);
    component = fixture.componentInstance;
  });

  it('should display filter query', async () => {
    fixture.detectChanges();
    component.filterString = 'test';
    fixture.detectChanges();
    await fixture.whenStable();
    const de = fixture.debugElement.query(By.css('input'));
    const el = de.nativeElement;
    expect(el.value).toContain('test');
  });

  it('should emit add event when clicking on the + button', () => {
    fixture.detectChanges();
    const spy = spyOn(component.addEvent, 'emit');
    const de = fixture.debugElement.query(By.css('button'));
    de.triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should display sorting headers', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('.mat-sort-header'));
    expect(de.length).toBeTruthy();
    expect(de.length).toBeGreaterThan(0);
  });

  it('should display flight id, route, airplane, departure, reserved seats, seat price and details/edit/delete', async () => {
    component.flights = flights;
    component.update();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('td'));
    const el1: HTMLElement = de[0].nativeElement;
    const el2: HTMLElement = de[1].nativeElement;
    const el3: HTMLElement = de[2].nativeElement;
    const el4: HTMLElement = de[3].nativeElement;
    const el5: HTMLElement = de[4].nativeElement;
    const el6: HTMLElement = de[5].nativeElement;
    const el7: HTMLElement = de[6].nativeElement;
    expect(el1.innerText).toContain(flights[0].id.toString());
    expect(el2.innerText).toContain(flights[0].route.originAirport.iataId);
    expect(el2.innerText).toContain(flights[0].route.destinationAirport.iataId);
    expect(el3.innerText).toContain(flights[0].airplane.id.toString());
    const pipe = new DatePipe('en-US');
    const transformed =
      pipe.transform(flights[0].departureTime, 'short') ||
      flights[0].departureTime.toISOString();
    expect(el4.innerText).toContain(transformed);
    expect(el5.innerText).toContain(flights[0].reservedSeats.toString());
    expect(el6.innerText).toContain(flights[0].seatPrice.toFixed(2));
    expect(el7.innerHTML).toContain('Details');
    expect(el7.innerHTML).toContain('Edit');
    expect(el7.innerHTML).toContain('Delete');
  });

  it('should emit details event when clicking on details button', async () => {
    component.flights = flights;
    component.update();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const spy = spyOn(component.flightTableEvent, 'emit');
    const de = fixture.debugElement.query(By.css('td > button'));
    de.triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalledWith({
      id: 1,
      eventType: TableEventType.DETAILS,
    });
  });

  it('should emit edit event when clicking on edit button', async () => {
    component.flights = flights;
    component.update();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const spy = spyOn(component.flightTableEvent, 'emit');
    const de = fixture.debugElement.query(By.css('td > button ~ button'));
    de.triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalledWith({
      id: 1,
      eventType: TableEventType.EDIT,
    });
  });

  it('should emit delete event when clicking on delete button', async () => {
    component.flights = flights;
    component.update();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const spy = spyOn(component.flightTableEvent, 'emit');
    const de = fixture.debugElement.query(
      By.css('td > button ~ button ~ button')
    );
    de.triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalledWith({
      id: 1,
      eventType: TableEventType.DELETE,
    });
  });

  it('should disable delete button when flight has bookings', async () => {
    component.flights = [
      new Flight(
        1,
        new Route(
          2,
          new Airport('SFO', 'San Francisco', [], []),
          new Airport('LAX', 'Los Angeles', [], []),
          []
        ),
        new Airplane(3, new AirplaneType(2, 34, []), []),
        new Date(),
        2,
        3,
        [{ abc: 'def' }]
      ),
    ];
    component.update();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const de = fixture.debugElement.query(
      By.css('td > button ~ button ~ button')
    );
    expect(de.properties['disabled']).toBeTruthy();
  });

  it('should display pagination', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.directive(MatPaginator));
    expect(de).toBeTruthy();
  });
});
