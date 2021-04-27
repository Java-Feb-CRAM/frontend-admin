// import { ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { AirplaneTypeFormComponent } from './airplane-type-form.component';
// import { ReactiveFormsModule } from '@angular/forms';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//
// describe('AirplaneTypeFormComponent', () => {
//   let component: AirplaneTypeFormComponent;
//   let fixture: ComponentFixture<AirplaneTypeFormComponent>;
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
//       declarations: [AirplaneTypeFormComponent],
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
//     fixture = TestBed.createComponent(AirplaneTypeFormComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
