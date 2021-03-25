import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAirplanesComponent } from './manage-airplanes.component';

describe('ManageAirplanesComponent', () => {
  let component: ManageAirplanesComponent;
  let fixture: ComponentFixture<ManageAirplanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageAirplanesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAirplanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
