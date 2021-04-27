import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesPageComponent } from './routes-page.component';
import { MatDialog } from '@angular/material/dialog';
import { RouteTableComponent } from '../../components/route/route-table/route-table.component';
import { Route } from '../../models/Route';
import { Airport } from '../../models/Airport';
import { Observable, of } from 'rxjs';
import { ComponentType } from '@angular/cdk/overlay';
import { RouteService } from '../../services/route.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TableEventType } from '../../interfaces/TableEventType';

const route = new Route(
  1,
  new Airport('LAX', 'Los Angeles', [], []),
  new Airport('SFO', 'San Francisco', [], []),
  []
);

class RouteServiceStub {
  getAllRoutes(): Observable<Route[]> {
    return of([route]);
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

describe('RoutesPageComponent', () => {
  let component: RoutesPageComponent;
  let fixture: ComponentFixture<RoutesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RoutesPageComponent, RouteTableComponent],
      providers: [
        {
          provide: RouteService,
          useClass: RouteServiceStub,
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
    fixture = TestBed.createComponent(RoutesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display table component', () => {
    const de = fixture.debugElement.query(By.directive(RouteTableComponent));
    expect(de).toBeTruthy();
  });

  it('should set table input', () => {
    const de = fixture.debugElement.query(By.directive(RouteTableComponent));
    expect(de.componentInstance.routes).toContain(route);
  });

  it('should show create form', () => {
    const de = fixture.debugElement.query(By.directive(RouteTableComponent));
    const comp: RouteTableComponent = de.componentInstance;
    const spy = spyOn(component, 'showCreateForm');
    comp.addEvent.emit(true);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should show details modal', () => {
    const de = fixture.debugElement.query(By.directive(RouteTableComponent));
    const comp: RouteTableComponent = de.componentInstance;
    const spy = spyOn(component, 'showDetails');
    comp.routeTableEvent.emit({
      id: 1,
      eventType: TableEventType.DETAILS,
    });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should show update form', () => {
    const de = fixture.debugElement.query(By.directive(RouteTableComponent));
    const comp: RouteTableComponent = de.componentInstance;
    const spy = spyOn(component, 'showUpdateForm');
    comp.routeTableEvent.emit({ id: 1, eventType: TableEventType.EDIT });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should show delete modal', () => {
    const de = fixture.debugElement.query(By.directive(RouteTableComponent));
    const comp: RouteTableComponent = de.componentInstance;
    const spy = spyOn(component, 'deleteRoute');
    comp.routeTableEvent.emit({
      id: 1,
      eventType: TableEventType.DELETE,
    });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(1);
  });
});
