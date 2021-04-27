import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportTableComponent } from './airport-table.component';
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
import { Airport } from '../../../models/Airport';
import { By } from '@angular/platform-browser';
import { TableEventType } from '../../../interfaces/TableEventType';
import { Airplane } from '../../../models/Airplane';
import { AirplaneType } from '../../../models/AirplaneType';
import { Flight } from '../../../models/Flight';
import { Route } from '../../../models/Route';

const airports = [new Airport('IAH', 'Houston', [], [])];

describe('AirportTableComponent', () => {
  let component: AirportTableComponent;
  let fixture: ComponentFixture<AirportTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AirportTableComponent,
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
    fixture = TestBed.createComponent(AirportTableComponent);
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

  it('should display airport iata id, airport city and details/edit/delete', async () => {
    component.airports = airports;
    component.update();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const de = fixture.debugElement.queryAll(By.css('td'));
    const el1: HTMLElement = de[0].nativeElement;
    const el2: HTMLElement = de[1].nativeElement;
    const el3: HTMLElement = de[2].nativeElement;
    expect(el1.innerText).toContain(airports[0].iataId);
    expect(el2.innerText).toContain(airports[0].city);
    expect(el3.innerHTML).toContain('Details');
    expect(el3.innerHTML).toContain('Edit');
    expect(el3.innerHTML).toContain('Delete');
  });

  it('should emit details event when clicking on details button', async () => {
    component.airports = airports;
    component.update();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const spy = spyOn(component.airportTableEvent, 'emit');
    const de = fixture.debugElement.query(By.css('td > button'));
    de.triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalledWith({
      iataId: 'IAH',
      eventType: TableEventType.DETAILS,
    });
  });

  it('should emit edit event when clicking on edit button', async () => {
    component.airports = airports;
    component.update();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const spy = spyOn(component.airportTableEvent, 'emit');
    const de = fixture.debugElement.query(By.css('td > button ~ button'));
    de.triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalledWith({
      iataId: 'IAH',
      eventType: TableEventType.EDIT,
    });
  });

  it('should emit delete event when clicking on delete button', async () => {
    component.airports = airports;
    component.update();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const spy = spyOn(component.airportTableEvent, 'emit');
    const de = fixture.debugElement.query(
      By.css('td > button ~ button ~ button')
    );
    de.triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalledWith({
      iataId: 'IAH',
      eventType: TableEventType.DELETE,
    });
  });

  it('should disable delete button when airport has routes', async () => {
    component.airports = [
      new Airport(
        'IAH',
        'Houston',
        [
          new Route(
            3,
            new Airport('SFO', 'San Francisco', [], []),
            new Airport('LAX', 'Los Angeles', [], []),
            []
          ),
        ],
        []
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
