import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Flight } from '../../../models/Flight';
import { FlightService } from '../../../services/flight.service';
import { Route } from '../../../models/Route';
import { Airplane } from '../../../models/Airplane';
import { CreateFlightDto } from '../dto/CreateFlightDto';
import { RouteService } from '../../../services/route.service';
import { AirplaneService } from '../../../services/airplane.service';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss'],
})
export class FlightListComponent implements OnInit {
  @Input() flights: Flight[] = [];

  @Output() detailedFlightEvent = new EventEmitter<number>();
  @Output() editFlightEvent = new EventEmitter<number>();
  @Output() deleteFlightEvent = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  detailedFlight(flightId: number): void {
    this.detailedFlightEvent.emit(flightId);
  }

  editFlight(flightId: number): void {
    this.editFlightEvent.emit(flightId);
  }

  deleteFlight(flightId: number): void {
    this.deleteFlightEvent.emit(flightId);
  }

  // flights: Flight[];
  // routes: Route[];
  // airplanes: Airplane[];
  // model = new CreateFlightDto(0, 0, new Date(), 0, 0);
  // submitted = false;
  // constructor(
  //   private flightService: FlightService,
  //   private routeService: RouteService,
  //   private airplaneService: AirplaneService
  // ) {
  //   this.flights = [];
  //   this.routes = [];
  //   this.airplanes = [];
  // }
  //
  // ngOnInit(): void {
  //   this.getAllFlights();
  //   this.getAllRoutes();
  //   this.getAllAirplanes();
  // }
  //
  // onSubmit(): void {
  //   this.submitted = true;
  //   this.createFlight(this.model);
  // }
  //
  // createFlight(createFlightDto: CreateFlightDto): void {
  //   this.flightService
  //     .createFlight(createFlightDto)
  //     .subscribe((flight) => this.flights.push(flight));
  // }
  //
  // getAllFlights(): void {
  //   this.flightService
  //     .getAllFlights()
  //     .subscribe((data: Flight[]) => (this.flights = data));
  // }
  //
  // getAllRoutes(): void {
  //   this.routeService
  //     .getRoutes()
  //     .subscribe((data: Route[]) => (this.routes = data));
  // }
  //
  // getAllAirplanes(): void {
  //   this.airplaneService
  //     .getAllAirplanes()
  //     .subscribe((data: Airplane[]) => (this.airplanes = data));
  // }
  //
  // get diagnostic(): string {
  //   return JSON.stringify(this.model);
  // }
}
