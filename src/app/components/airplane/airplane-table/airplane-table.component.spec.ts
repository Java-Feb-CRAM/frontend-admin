import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplaneTableComponent } from './airplane-table.component';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
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
import { Airplane } from '../../../models/Airplane';
import { AirplaneType } from '../../../models/AirplaneType';
import { TableEventType } from '../../../interfaces/TableEventType';
import { Flight } from '../../../models/Flight';
import { Route } from '../../../models/Route';
import { Airport } from '../../../models/Airport';

const airplanes = [new Airplane(1, new AirplaneType(2, 33, []), [])];
describe('AirplaneTableComponent', () => {
  let component: AirplaneTableComponent;
  let fixture: ComponentFixture<AirplaneTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AirplaneTableComponent,
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
    fixture = TestBed.createComponent(AirplaneTableComponent);
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

  it('should display airplane id, airplane type id and details/edit/delete', async () => {
    component.airplanes = airplanes;
    component.update();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('td'));
    const el1: HTMLElement = de[0].nativeElement;
    const el2: HTMLElement = de[1].nativeElement;
    const el3: HTMLElement = de[2].nativeElement;
    expect(el1.innerText).toContain(airplanes[0].id.toString());
    expect(el2.innerText).toContain(airplanes[0].airplaneType.id.toString());
    expect(el3.innerHTML).toContain('Details');
    expect(el3.innerHTML).toContain('Edit');
    expect(el3.innerHTML).toContain('Delete');
  });

  it('should emit details event when clicking on details button', async () => {
    component.airplanes = airplanes;
    component.update();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const spy = spyOn(component.airplaneTableEvent, 'emit');
    const de = fixture.debugElement.query(By.css('td > button'));
    de.triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalledWith({
      id: 1,
      eventType: TableEventType.DETAILS,
    });
  });

  it('should emit edit event when clicking on edit button', async () => {
    component.airplanes = airplanes;
    component.update();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const spy = spyOn(component.airplaneTableEvent, 'emit');
    const de = fixture.debugElement.query(By.css('td > button ~ button'));
    de.triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalledWith({
      id: 1,
      eventType: TableEventType.EDIT,
    });
  });

  it('should emit delete event when clicking on delete button', async () => {
    component.airplanes = airplanes;
    component.update();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const spy = spyOn(component.airplaneTableEvent, 'emit');
    const de = fixture.debugElement.query(
      By.css('td > button ~ button ~ button')
    );
    de.triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalledWith({
      id: 1,
      eventType: TableEventType.DELETE,
    });
  });

  it('should disable delete button when airplane has flights', async () => {
    component.airplanes = [
      new Airplane(1, new AirplaneType(2, 33, []), [
        new Flight(
          3,
          new Route(
            2,
            new Airport('LAX', 'Los Angeles', [], []),
            new Airport('SFO', 'San Francisco', [], []),
            []
          ),
          airplanes[0],
          new Date(),
          2,
          3,
          []
        ),
      ]),
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
