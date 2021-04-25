import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteTableComponent } from './route-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

describe('RouteTableComponent', () => {
  let component: RouteTableComponent;
  let fixture: ComponentFixture<RouteTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FormsModule,
      ],
      declarations: [RouteTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
