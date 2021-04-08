import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplaneTypeTableComponent } from './airplane-type-table.component';

describe('AirplaneTypeTableComponent', () => {
  let component: AirplaneTypeTableComponent;
  let fixture: ComponentFixture<AirplaneTypeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirplaneTypeTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirplaneTypeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
