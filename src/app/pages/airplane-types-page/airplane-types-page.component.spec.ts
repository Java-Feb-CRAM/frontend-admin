import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplaneTypesPageComponent } from './airplane-types-page.component';
import { MatDialog } from '@angular/material/dialog';
import { AirplaneTypeTableComponent } from '../../components/airplane-type/airplane-type-table/airplane-type-table.component';
import { AirplaneTypeService } from '../../services/airplane-type.service';
import { Observable, of } from 'rxjs';
import { AirplaneType } from '../../models/AirplaneType';
import { ComponentType } from '@angular/cdk/overlay';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TableEventType } from '../../interfaces/TableEventType';

const airplaneType = new AirplaneType(1, 2, []);

class AirplaneTypeServiceStub {
  getAllAirplaneTypes(): Observable<AirplaneType[]> {
    return of([airplaneType]);
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

describe('AirplaneTypesPageComponent', () => {
  let component: AirplaneTypesPageComponent;
  let fixture: ComponentFixture<AirplaneTypesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirplaneTypesPageComponent, AirplaneTypeTableComponent],
      providers: [
        {
          provide: AirplaneTypeService,
          useClass: AirplaneTypeServiceStub,
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
    fixture = TestBed.createComponent(AirplaneTypesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display table component', () => {
    const de = fixture.debugElement.query(
      By.directive(AirplaneTypeTableComponent)
    );
    expect(de).toBeTruthy();
  });

  it('should set table input', () => {
    const de = fixture.debugElement.query(
      By.directive(AirplaneTypeTableComponent)
    );
    expect(de.componentInstance.airplaneTypes).toContain(airplaneType);
  });

  it('should show create form', () => {
    const de = fixture.debugElement.query(
      By.directive(AirplaneTypeTableComponent)
    );
    const comp: AirplaneTypeTableComponent = de.componentInstance;
    const spy = spyOn(component, 'showCreateForm');
    comp.addEvent.emit(true);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should show details modal', () => {
    const de = fixture.debugElement.query(
      By.directive(AirplaneTypeTableComponent)
    );
    const comp: AirplaneTypeTableComponent = de.componentInstance;
    const spy = spyOn(component, 'showDetails');
    comp.airplaneTypeTableEvent.emit({
      id: 1,
      eventType: TableEventType.DETAILS,
    });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should show update form', () => {
    const de = fixture.debugElement.query(
      By.directive(AirplaneTypeTableComponent)
    );
    const comp: AirplaneTypeTableComponent = de.componentInstance;
    const spy = spyOn(component, 'showUpdateForm');
    comp.airplaneTypeTableEvent.emit({ id: 1, eventType: TableEventType.EDIT });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should show delete modal', () => {
    const de = fixture.debugElement.query(
      By.directive(AirplaneTypeTableComponent)
    );
    const comp: AirplaneTypeTableComponent = de.componentInstance;
    const spy = spyOn(component, 'deleteAirplaneType');
    comp.airplaneTypeTableEvent.emit({
      id: 1,
      eventType: TableEventType.DELETE,
    });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(1);
  });
});
