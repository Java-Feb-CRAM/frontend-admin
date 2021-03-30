import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplaneTableComponent } from './airplane-table.component';

describe('AirplaneTableComponent', () => {
  let component: AirplaneTableComponent;
  let fixture: ComponentFixture<AirplaneTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirplaneTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirplaneTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
