import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplaneTypeDetailsComponent } from './airplane-type-details.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AirplaneType } from '../../../models/AirplaneType';
import { Airplane } from '../../../models/Airplane';
import { By } from '@angular/platform-browser';
import createSpy = jasmine.createSpy;
import { MatButton, MatButtonModule } from '@angular/material/button';

const airplane = new Airplane(2, new AirplaneType(1, 45, []), []);
const airplaneType = new AirplaneType(4, 23, [airplane]);

describe('AirplaneTypeDetailsComponent', () => {
  let component: AirplaneTypeDetailsComponent;
  let fixture: ComponentFixture<AirplaneTypeDetailsComponent>;
  const mockDialogRef = {
    close: createSpy('close'),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirplaneTypeDetailsComponent, MatButton],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            airplaneType,
          },
        },
      ],
      imports: [MatButtonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirplaneTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display airplane type id', () => {
    const de = fixture.debugElement.query(By.css('ul > li'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain(airplaneType.id.toString());
  });

  it('should display airplane type max capacity', () => {
    const de = fixture.debugElement.query(By.css('ul > li ~ li'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain(airplaneType.maxCapacity.toString());
  });

  it('should display number of airplanes with airplane type', () => {
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
