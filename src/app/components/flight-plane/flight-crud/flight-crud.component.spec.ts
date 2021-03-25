import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightCrudComponent } from './flight-crud.component';

describe('FlightCrudComponent', () => {
  let component: FlightCrudComponent;
  let fixture: ComponentFixture<FlightCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FlightCrudComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
