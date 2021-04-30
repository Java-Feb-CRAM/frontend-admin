import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplaneDetailsComponent } from './airplane-details.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Airplane } from '../../../models/Airplane';
import { AirplaneType } from '../../../models/AirplaneType';
import { By } from '@angular/platform-browser';
import { Flight } from '../../../models/Flight';
import { Airport } from '../../../models/Airport';
import { Route } from '../../../models/Route';
import createSpy = jasmine.createSpy;
import { MatButton, MatButtonModule } from '@angular/material/button';

const flight = new Flight(
  23,
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
const airplane = new Airplane(2, new AirplaneType(1, 45, []), [flight]);

describe('AirplaneDetailsComponent', () => {
  let component: AirplaneDetailsComponent;
  let fixture: ComponentFixture<AirplaneDetailsComponent>;
  const mockDialogRef = {
    close: createSpy('close'),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirplaneDetailsComponent, MatButton],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            airplane,
          },
        },
      ],
      imports: [MatButtonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirplaneDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display airplane id', () => {
    const de = fixture.debugElement.query(By.css('ul > li'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain(airplane.id.toString());
  });

  it('should display airplane type id', () => {
    const de = fixture.debugElement.query(By.css('ul > li ~ li'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain(airplane.airplaneType.id.toString());
  });

  it('should display the number of flights', () => {
    const de = fixture.debugElement.query(By.css('ul > li ~ li ~ li'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('1');
  });

  it('should close the dialog when clicking on the close button', () => {
    const de = fixture.debugElement.query(By.css('button'));
    de.triggerEventHandler('click', null);
    expect(mockDialogRef.close).toHaveBeenCalledWith('close');
  });
});
