import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSeatLayoutPageComponent } from './create-seat-layout-page.component';

describe('CreateSeatLayoutPageComponent', () => {
  let component: CreateSeatLayoutPageComponent;
  let fixture: ComponentFixture<CreateSeatLayoutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSeatLayoutPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSeatLayoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
