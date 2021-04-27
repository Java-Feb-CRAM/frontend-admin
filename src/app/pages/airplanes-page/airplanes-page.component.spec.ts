import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplanesPageComponent } from './airplanes-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AirplaneTableComponent } from '../../components/airplane/airplane-table/airplane-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Airplane } from '../../models/Airplane';
import { AirplaneType } from '../../models/AirplaneType';
import { Observable, of } from 'rxjs';
import { ComponentType } from '@angular/cdk/overlay';
import { AirplaneService } from '../../services/airplane.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AirplaneTypeTableComponent } from '../../components/airplane-type/airplane-type-table/airplane-type-table.component';
import { TableEventType } from '../../interfaces/TableEventType';

const airplane = new Airplane(1, new AirplaneType(3, 4, []), []);

class AirplaneServiceStub {
  getAllAirplanes(): Observable<Airplane[]> {
    return of([airplane]);
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

describe('AirplanesPageComponent', () => {
  let component: AirplanesPageComponent;
  let fixture: ComponentFixture<AirplanesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirplanesPageComponent, AirplaneTableComponent],
      providers: [
        {
          provide: AirplaneService,
          useClass: AirplaneServiceStub,
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
    fixture = TestBed.createComponent(AirplanesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display table component', () => {
    const de = fixture.debugElement.query(By.directive(AirplaneTableComponent));
    expect(de).toBeTruthy();
  });

  it('should set table input', () => {
    const de = fixture.debugElement.query(By.directive(AirplaneTableComponent));
    expect(de.componentInstance.airplanes).toContain(airplane);
  });

  it('should show create form', () => {
    const de = fixture.debugElement.query(By.directive(AirplaneTableComponent));
    const comp: AirplaneTableComponent = de.componentInstance;
    const spy = spyOn(component, 'showCreateForm');
    comp.addEvent.emit(true);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should show details modal', () => {
    const de = fixture.debugElement.query(By.directive(AirplaneTableComponent));
    const comp: AirplaneTableComponent = de.componentInstance;
    const spy = spyOn(component, 'showDetails');
    comp.airplaneTableEvent.emit({
      id: 1,
      eventType: TableEventType.DETAILS,
    });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should show update form', () => {
    const de = fixture.debugElement.query(By.directive(AirplaneTableComponent));
    const comp: AirplaneTableComponent = de.componentInstance;
    const spy = spyOn(component, 'showUpdateForm');
    comp.airplaneTableEvent.emit({ id: 1, eventType: TableEventType.EDIT });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should show delete modal', () => {
    const de = fixture.debugElement.query(By.directive(AirplaneTableComponent));
    const comp: AirplaneTableComponent = de.componentInstance;
    const spy = spyOn(component, 'deleteAirplane');
    comp.airplaneTableEvent.emit({
      id: 1,
      eventType: TableEventType.DELETE,
    });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(1);
  });
});
