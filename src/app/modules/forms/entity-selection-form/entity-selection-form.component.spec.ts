import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitySelectionFormComponent } from './entity-selection-form.component';

describe('EntitySelectionFormComponent', () => {
  let component: EntitySelectionFormComponent;
  let fixture: ComponentFixture<EntitySelectionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntitySelectionFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitySelectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
