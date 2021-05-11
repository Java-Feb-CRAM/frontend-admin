import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColHeaderFormComponent } from './col-header-form.component';

describe('ColHeaderFormComponent', () => {
  let component: ColHeaderFormComponent;
  let fixture: ComponentFixture<ColHeaderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColHeaderFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColHeaderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
