import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeFormComponent } from './date-time-form.component';

describe('DateTimeFormComponent', () => {
  let component: DateTimeFormComponent;
  let fixture: ComponentFixture<DateTimeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateTimeFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
