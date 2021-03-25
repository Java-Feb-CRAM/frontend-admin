import { Component, OnInit } from '@angular/core';
import { Flight } from '../../../models/Flight';
import { FlightService } from '../../../services/flight.service';
import { Route } from '../../../models/Route';
import { CellStyle } from '../../data-table/data-table.component';

@Component({
  selector: 'app-manage-flights',
  templateUrl: './manage-flights.component.html',
  styleUrls: ['./manage-flights.component.scss'],
})
export class ManageFlightsComponent implements OnInit {
  flights: Flight[] = [];
  cellStyles: CellStyle[] = [
    CellStyle.NONE,
    CellStyle.HTML,
    CellStyle.NONE,
    CellStyle.DATE,
    CellStyle.NONE,
    CellStyle.MONEY,
  ];
  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    this.getAllFlights();
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
