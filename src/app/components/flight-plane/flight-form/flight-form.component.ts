import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Route } from '../../../models/Route';
import { Airplane } from '../../../models/Airplane';
import { CreateFlightDto } from '../dto/CreateFlightDto';
import { FlightService } from '../../../services/flight.service';
import { RouteService } from '../../../services/route.service';
import { AirplaneService } from '../../../services/airplane.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Flight } from '../../../models/Flight';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.scss'],
})
export class FlightFormComponent implements OnInit {
  @Output() newFlightEvent = new EventEmitter<Flight>();
  routes: Route[];
  airplanes: Airplane[];
  @Input() model = new CreateFlightDto(0, 0, new Date(), 0, 0);
  submitted = false;
  constructor(
    private flightService: FlightService,
    private routeService: RouteService,
    private airplaneService: AirplaneService,
    public activeModal: NgbActiveModal
  ) {
    this.routes = [];
    this.airplanes = [];
  }

  ngOnInit(): void {
    this.getAllRoutes();
    this.getAllAirplanes();
  }

  onSubmit(): void {
    this.submitted = true;
    this.createFlight(this.model);
    this.activeModal.close('Flight created');
  }

  createFlight(createFlightDto: CreateFlightDto): void {
    this.flightService
      .createFlight(createFlightDto)
      .subscribe((flight) => this.newFlightEvent.emit(flight));
  }

  getAllRoutes(): void {
    this.routeService
      .getRoutes()
      .subscribe((data: Route[]) => (this.routes = data));
  }

  getAllAirplanes(): void {
    this.airplaneService
      .getAllAirplanes()
      .subscribe((data: Airplane[]) => (this.airplanes = data));
  }
}
