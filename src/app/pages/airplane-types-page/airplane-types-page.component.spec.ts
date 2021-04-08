import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplaneTypesPageComponent } from './airplane-types-page.component';

describe('AirplaneTypesPageComponent', () => {
  let component: AirplaneTypesPageComponent;
  let fixture: ComponentFixture<AirplaneTypesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirplaneTypesPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirplaneTypesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
