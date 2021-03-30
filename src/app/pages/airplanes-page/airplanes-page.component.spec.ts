import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplanesPageComponent } from './airplanes-page.component';

describe('AirplanesPageComponent', () => {
  let component: AirplanesPageComponent;
  let fixture: ComponentFixture<AirplanesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirplanesPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirplanesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
