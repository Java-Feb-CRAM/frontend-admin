import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteDetailsComponent } from './route-details.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Route } from '../../../models/Route';
import { Airport } from '../../../models/Airport';

describe('RouteDetailsComponent', () => {
  let component: RouteDetailsComponent;
  let fixture: ComponentFixture<RouteDetailsComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close'),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RouteDetailsComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            route: new Route(
              1,
              new Airport('IAH', 'Houston', [], []),
              new Airport('SFO', 'San Francisco', [], []),
              []
            ),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
