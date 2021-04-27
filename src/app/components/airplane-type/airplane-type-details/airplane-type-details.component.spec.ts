// import { ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { AirplaneTypeDetailsComponent } from './airplane-type-details.component';
// import {
//   MAT_DIALOG_DATA,
//   MatDialogModule,
//   MatDialogRef,
// } from '@angular/material/dialog';
// import { AirplaneType } from '../../../models/AirplaneType';
//
// describe('AirplaneTypeDetailsComponent', () => {
//   let component: AirplaneTypeDetailsComponent;
//   let fixture: ComponentFixture<AirplaneTypeDetailsComponent>;
//   const mockDialogRef = {
//     close: jasmine.createSpy('close'),
//   };
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [MatDialogModule],
//       declarations: [AirplaneTypeDetailsComponent],
//       providers: [
//         {
//           provide: MatDialogRef,
//           useValue: mockDialogRef,
//         },
//         {
//           provide: MAT_DIALOG_DATA,
//           useValue: {
//             airplaneType: new AirplaneType(1, 43, []),
//           },
//         },
//       ],
//     }).compileComponents();
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(AirplaneTypeDetailsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
