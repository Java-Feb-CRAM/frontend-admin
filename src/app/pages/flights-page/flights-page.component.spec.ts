import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsPageComponent } from './flights-page.component';
import { MatDialog } from '@angular/material/dialog';
import { FlightTableComponent } from '../../components/flight/flight-table/flight-table.component';
import { Flight } from '../../models/Flight';
import { Route } from '../../models/Route';
import { Airplane } from '../../models/Airplane';
import { Airport } from '../../models/Airport';
import { AirplaneType } from '../../models/AirplaneType';
import { Observable, of } from 'rxjs';
import { ComponentType } from '@angular/cdk/overlay';
import { FlightService } from '../../services/flight.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TableEventType } from '../../interfaces/TableEventType';

const flight = new Flight(
  1,
  new Route(
    2,
    new Airport('LAX', 'Los Angeles', [], []),
    new Airport('' + 'SFO', 'San Francisco', [], []),
    []
  ),
  new Airplane(5, new AirplaneType(2, 2, []), []),
  new Date(),
  2,
  2,
  []
);

class FlightServiceStub {
  getAllFlights(): Observable<Flight[]> {
    return of([flight]);
  }
}

class MatDialogRefStub<T> {
  private data: any;

  constructor(data: any) {
    this.data = data;
  }

  afterClosed(): Observable<any> {
    return of(this.data);
  }
}

class MatDialogStub {
  private data: any;

  setData(data: any): void {
    this.data = data;
  }
  open<T>(comp: ComponentType<T>, config: any): MatDialogRefStub<T> {
    return new MatDialogRefStub<T>(this.data);
  }
}

describe('FlightsPageComponent', () => {
  let component: FlightsPageComponent;
  let fixture: ComponentFixture<FlightsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightsPageComponent, FlightTableComponent],
      providers: [
        {
          provide: FlightService,
          useClass: FlightServiceStub,
        },
        {
          provide: MatDialog,
          useClass: MatDialogStub,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display table component', () => {
    const de = fixture.debugElement.query(By.directive(FlightTableComponent));
    expect(de).toBeTruthy();
  });

  it('should set table input', () => {
    const de = fixture.debugElement.query(By.directive(FlightTableComponent));
    expect(de.componentInstance.flights).toContain(flight);
  });

  it('should show create form', () => {
    const de = fixture.debugElement.query(By.directive(FlightTableComponent));
    const comp: FlightTableComponent = de.componentInstance;
    const spy = spyOn(component, 'showCreateForm');
    comp.addEvent.emit(true);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should show details modal', () => {
    const de = fixture.debugElement.query(By.directive(FlightTableComponent));
    const comp: FlightTableComponent = de.componentInstance;
    const spy = spyOn(component, 'showDetails');
    comp.flightTableEvent.emit({
      id: 1,
      eventType: TableEventType.DETAILS,
    });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should show update form', () => {
    const de = fixture.debugElement.query(By.directive(FlightTableComponent));
    const comp: FlightTableComponent = de.componentInstance;
    const spy = spyOn(component, 'showUpdateForm');
    comp.flightTableEvent.emit({ id: 1, eventType: TableEventType.EDIT });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should show delete modal', () => {
    const de = fixture.debugElement.query(By.directive(FlightTableComponent));
    const comp: FlightTableComponent = de.componentInstance;
    const spy = spyOn(component, 'deleteFlight');
    comp.flightTableEvent.emit({
      id: 1,
      eventType: TableEventType.DELETE,
    });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(1);
  });
});
