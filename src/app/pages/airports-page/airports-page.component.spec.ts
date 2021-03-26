import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportsPageComponent } from './airports-page.component';

describe('AirportsPageComponent', () => {
  let component: AirportsPageComponent;
  let fixture: ComponentFixture<AirportsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirportsPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirportsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
