import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatLayoutsPageComponent } from './seat-layouts-page.component';

describe('SeatLayoutsPageComponent', () => {
  let component: SeatLayoutsPageComponent;
  let fixture: ComponentFixture<SeatLayoutsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeatLayoutsPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatLayoutsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
