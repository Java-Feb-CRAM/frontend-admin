// import { ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { AirportDetailsComponent } from './airport-details.component';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { Airport } from '../../../models/Airport';
//
// describe('AirportDetailsComponent', () => {
//   let component: AirportDetailsComponent;
//   let fixture: ComponentFixture<AirportDetailsComponent>;
//   const mockDialogRef = {
//     close: jasmine.createSpy('close'),
//   };
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [AirportDetailsComponent],
//       providers: [
//         {
//           provide: MatDialogRef,
//           useValue: mockDialogRef,
//         },
//         {
//           provide: MAT_DIALOG_DATA,
//           useValue: {
//             airport: new Airport('IAH', 'Houston', [], []),
//           },
//         },
//       ],
//     }).compileComponents();
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(AirportDetailsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
