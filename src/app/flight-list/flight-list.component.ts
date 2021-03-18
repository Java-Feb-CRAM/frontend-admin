import { Component, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss'],
})
export class FlightListComponent implements OnInit {
  constructor(private flightService: FlightService) {}

  ngOnInit(): void {}

  showFlights() {
    this.flightService
      .getFlights()
      .subscribe((data: Flight) => (this.flights = {}));
  }
}
