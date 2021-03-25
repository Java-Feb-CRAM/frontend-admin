import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositiveIntegerFormComponent } from './positive-integer-form.component';

describe('PositiveIntegerFormComponent', () => {
  let component: PositiveIntegerFormComponent;
  let fixture: ComponentFixture<PositiveIntegerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PositiveIntegerFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositiveIntegerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
