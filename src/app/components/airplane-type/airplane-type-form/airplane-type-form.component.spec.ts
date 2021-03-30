import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplaneTypeFormComponent } from './airplane-type-form.component';

describe('AirplaneTypeFormComponent', () => {
  let component: AirplaneTypeFormComponent;
  let fixture: ComponentFixture<AirplaneTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirplaneTypeFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirplaneTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
