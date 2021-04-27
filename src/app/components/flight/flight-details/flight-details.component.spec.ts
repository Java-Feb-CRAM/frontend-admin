// import { ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { FlightDetailsComponent } from './flight-details.component';
// import {
//   MAT_DIALOG_DATA,
//   MatDialogModule,
//   MatDialogRef,
// } from '@angular/material/dialog';
// import { Flight } from '../../../models/Flight';
// import { Route } from '../../../models/Route';
// import { Airport } from '../../../models/Airport';
// import { Airplane } from '../../../models/Airplane';
// import { AirplaneType } from '../../../models/AirplaneType';
//
// describe('FlightDetailsComponent', () => {
//   let component: FlightDetailsComponent;
//   let fixture: ComponentFixture<FlightDetailsComponent>;
//   const mockDialogRef = {
//     close: jasmine.createSpy('close'),
//   };
//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [MatDialogModule],
//       declarations: [FlightDetailsComponent],
//       providers: [
//         {
//           provide: MatDialogRef,
//           useValue: mockDialogRef,
//         },
//         {
//           provide: MAT_DIALOG_DATA,
//           useValue: {
//             flight: new Flight(
//               1,
//               new Route(
//                 1,
//                 new Airport('LAX', 'Los Angeles', [], []),
//                 new Airport('JFK', 'New York City', [], []),
//                 []
//               ),
//               new Airplane(1, new AirplaneType(3, 4, []), []),
//               new Date(),
//               2,
//               9.99,
//               []
//             ),
//           },
//         },
//       ],
//     }).compileComponents();
//   });
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(FlightDetailsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
