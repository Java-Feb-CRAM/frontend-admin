import { Component, OnInit } from '@angular/core';
import { Flight } from '../../../models/Flight';
import { FlightService } from '../../../services/flight.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlightFormComponent } from '../flight-form/flight-form.component';
import { FlightDetailsComponent } from '../flight-details/flight-details.component';
import { ConfirmModalComponent } from '../../confirm-modal/confirm-modal.component';
import { CreateFlightDto } from '../dto/CreateFlightDto';
import { CellStyle } from '../../data-table/data-table.component';
import { Route } from '../../../models/Route';

@Component({
  selector: 'app-flight-crud',
  templateUrl: './flight-crud.component.html',
  styleUrls: ['./flight-crud.component.scss'],
})
export class FlightCrudComponent implements OnInit {
  flights: Flight[];
  cellStyles: CellStyle[] = [
    CellStyle.NONE,
    CellStyle.HTML,
    CellStyle.NONE,
    CellStyle.DATE,
    CellStyle.NONE,
    CellStyle.MONEY,
  ];
  constructor(
    private flightService: FlightService,
    private modalService: NgbModal
  ) {
    this.flights = [];
  }

  ngOnInit(): void {
    this.getAllFlights();
  }

  open(): void {
    const modalRef = this.modalService.open(FlightFormComponent);
    modalRef.componentInstance.newFlightEvent.subscribe((flight: Flight) =>
      this.flights.push(flight)
    );
  }

  showFlightDetails(flightId: number): void {
    const modalRef = this.modalService.open(FlightDetailsComponent);
    modalRef.componentInstance.flight = this.flights.find(
      (flight) => flight.id === flightId
    );
  }

  editFlight(flightId: number): void {
    const foundFlight = this.flights.find((flight) => flight.id === flightId);
    if (foundFlight) {
      const model = new CreateFlightDto(
        foundFlight.route.id,
        foundFlight.airplane.id,
        foundFlight.departureTime,
        foundFlight.reservedSeats,
        foundFlight.seatPrice
      );
      const modalRef = this.modalService.open(FlightFormComponent);
      modalRef.componentInstance.model = model;
    }
  }

  deleteFlight(flightId: number): void {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title =
      'Are you sure you want to delete this flight?';
    modalRef.componentInstance.message =
      'This action is permanent and cannot be undone';
    modalRef.componentInstance.affirmEvent.subscribe((affirm: boolean) => {
      if (affirm) {
        this.deleteFlight2(flightId);
      }
    });
  }

  deleteFlight2(flightId: number): void {
    this.flightService
      .deleteFlight(flightId)
      .subscribe(
        () =>
          (this.flights = this.flights.filter(
            (flight) => flight.id !== flightId
          ))
      );
  }

  addFlight(flight: Flight): void {
    this.flights.push(flight);
  }

  getAllFlights(): void {
    this.flightService.getAllFlights().subscribe((data: Flight[]) => {
      data.forEach((flight) =>
        this.flights.push(
          new Flight(
            flight.id,
            new Route(
              flight.route.id,
              flight.route.originAirport,
              flight.route.destinationAirport,
              flight.route.flights
            ),
            flight.airplane,
            flight.departureTime,
            flight.reservedSeats,
            flight.seatPrice,
            flight.bookings
          )
        )
      );
    });
  }
}
