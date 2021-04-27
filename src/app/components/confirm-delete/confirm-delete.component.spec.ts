import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteComponent } from './confirm-delete.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import createSpy = jasmine.createSpy;

describe('ConfirmDeleteComponent', () => {
  let component: ConfirmDeleteComponent;
  let fixture: ComponentFixture<ConfirmDeleteComponent>;
  const mockDialogRef = {
    close: createSpy('close'),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmDeleteComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'Test Title',
            message: 'Test Message',
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteComponent);
    component = fixture.componentInstance;
  });

  it('should display default title if one is not provided', () => {
    component.data.title = undefined;
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('h1'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('Warning');
  });

  it('should display provided title if title is provided', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('h1'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('Test Title');
  });

  it('should display the provided message', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('p'));
    const el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('Test Message');
  });

  it('should close dialog with cancel when clicking on cancel button', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('button'));
    de.triggerEventHandler('click', null);
    expect(mockDialogRef.close).toHaveBeenCalledWith('cancel');
  });

  it('should close dialog with delete when clicking on delete button', () => {
    fixture.detectChanges();
    const de = fixture.debugElement.query(By.css('button ~ button'));
    de.triggerEventHandler('click', null);
    expect(mockDialogRef.close).toHaveBeenCalledWith('delete');
  });
});
