import { Component, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';
import { Flight } from '../models/Flight';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss'],
})
export class FlightListComponent implements OnInit {
  flights: Flight[];
  constructor(private flightService: FlightService) {
    this.flights = [];
  }

  ngOnInit(): void {
    this.showFlights();
    console.log(this.flights);
  }

  showFlights(): void {
    this.flightService
      .getFlights()
      .subscribe((data: Flight[]) => (this.flights = data));
  }
}
