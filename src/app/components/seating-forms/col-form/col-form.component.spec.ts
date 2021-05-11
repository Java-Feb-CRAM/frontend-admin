import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColFormComponent } from './col-form.component';

describe('ColFormComponent', () => {
  let component: ColFormComponent;
  let fixture: ComponentFixture<ColFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
