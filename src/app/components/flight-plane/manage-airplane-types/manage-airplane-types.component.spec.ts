import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAirplaneTypesComponent } from './manage-airplane-types.component';

describe('ManageAirplaneTypesComponent', () => {
  let component: ManageAirplaneTypesComponent;
  let fixture: ComponentFixture<ManageAirplaneTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageAirplaneTypesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAirplaneTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
