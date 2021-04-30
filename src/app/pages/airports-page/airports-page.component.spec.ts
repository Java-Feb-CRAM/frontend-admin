import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportsPageComponent } from './airports-page.component';
import { MatDialog } from '@angular/material/dialog';
import { AirportTableComponent } from '../../components/airport/airport-table/airport-table.component';
import { Observable, of } from 'rxjs';
import { ComponentType } from '@angular/cdk/overlay';
import { Airport } from '../../models/Airport';
import { AirportService } from '../../services/airport.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TableEventType } from '../../interfaces/TableEventType';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

const airport = new Airport('IAH', 'Houston', [], []);

class AirportServiceStub {
  getAllAirports(): Observable<Airport[]> {
    return of([airport]);
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

describe('AirportsPageComponent', () => {
  let component: AirportsPageComponent;
  let fixture: ComponentFixture<AirportsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirportsPageComponent, AirportTableComponent],
      providers: [
        {
          provide: AirportService,
          useClass: AirportServiceStub,
        },
        {
          provide: MatDialog,
          useClass: MatDialogStub,
        },
        MatSnackBar,
      ],
      imports: [MatSnackBarModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirportsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display table component', () => {
    const de = fixture.debugElement.query(By.directive(AirportTableComponent));
    expect(de).toBeTruthy();
  });

  it('should set table input', () => {
    const de = fixture.debugElement.query(By.directive(AirportTableComponent));
    expect(de.componentInstance.airports).toContain(airport);
  });

  it('should show create form', () => {
    const de = fixture.debugElement.query(By.directive(AirportTableComponent));
    const comp: AirportTableComponent = de.componentInstance;
    const spy = spyOn(component, 'showCreateForm');
    comp.addEvent.emit(true);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should show details modal', () => {
    const de = fixture.debugElement.query(By.directive(AirportTableComponent));
    const comp: AirportTableComponent = de.componentInstance;
    const spy = spyOn(component, 'showDetails');
    comp.airportTableEvent.emit({
      iataId: 'LAX',
      eventType: TableEventType.DETAILS,
    });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith('LAX');
  });

  it('should show update form', () => {
    const de = fixture.debugElement.query(By.directive(AirportTableComponent));
    const comp: AirportTableComponent = de.componentInstance;
    const spy = spyOn(component, 'showUpdateForm');
    comp.airportTableEvent.emit({
      iataId: 'LAX',
      eventType: TableEventType.EDIT,
    });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith('LAX');
  });

  it('should show delete modal', () => {
    const de = fixture.debugElement.query(By.directive(AirportTableComponent));
    const comp: AirportTableComponent = de.componentInstance;
    const spy = spyOn(component, 'deleteAirport');
    comp.airportTableEvent.emit({
      iataId: 'LAX',
      eventType: TableEventType.DELETE,
    });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith('LAX');
  });
});
