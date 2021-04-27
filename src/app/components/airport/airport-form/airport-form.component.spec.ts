// import { ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { AirportFormComponent } from './airport-form.component';
// import { ReactiveFormsModule } from '@angular/forms';
// import {
//   MAT_DIALOG_DATA,
//   MatDialogModule,
//   MatDialogRef,
// } from '@angular/material/dialog';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//
// describe('AirportFormComponent', () => {
//   let component: AirportFormComponent;
//   let fixture: ComponentFixture<AirportFormComponent>;
//   const mockDialogRef = {
//     close: jasmine.createSpy('close'),
//   };
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         ReactiveFormsModule,
//         HttpClientTestingModule,
//         MatFormFieldModule,
//         MatInputModule,
//         MatSelectModule,
//         BrowserAnimationsModule,
//       ],
//       declarations: [AirportFormComponent],
//       providers: [
//         {
//           provide: MatDialogRef,
//           useValue: mockDialogRef,
//         },
//         {
//           provide: MAT_DIALOG_DATA,
//           useValue: {},
//         },
//       ],
//     }).compileComponents();
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(AirportFormComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
