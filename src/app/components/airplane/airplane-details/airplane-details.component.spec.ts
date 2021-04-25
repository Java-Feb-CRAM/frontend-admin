import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplaneDetailsComponent } from './airplane-details.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Airplane } from '../../../models/Airplane';
import { AirplaneType } from '../../../models/AirplaneType';

describe('AirplaneDetailsComponent', () => {
  let component: AirplaneDetailsComponent;
  let fixture: ComponentFixture<AirplaneDetailsComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close'),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirplaneDetailsComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            airplane: new Airplane(2, new AirplaneType(2, 45, []), []),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirplaneDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
