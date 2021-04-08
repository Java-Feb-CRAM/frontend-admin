import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplaneTypeDetailsComponent } from './airplane-type-details.component';

describe('AirplaneTypeDetailsComponent', () => {
  let component: AirplaneTypeDetailsComponent;
  let fixture: ComponentFixture<AirplaneTypeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirplaneTypeDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirplaneTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
