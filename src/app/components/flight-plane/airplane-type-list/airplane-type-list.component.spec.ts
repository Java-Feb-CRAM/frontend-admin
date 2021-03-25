import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplaneTypeListComponent } from './airplane-type-list.component';

describe('AirplaneTypeListComponent', () => {
  let component: AirplaneTypeListComponent;
  let fixture: ComponentFixture<AirplaneTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AirplaneTypeListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirplaneTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
