import { Component, OnInit } from '@angular/core';
import { Airport } from '../models/Airport';
import { AirportService } from '../airport.service';

@Component({
  selector: 'app-airport-list',
  templateUrl: './airport-list.component.html',
  styleUrls: ['./airport-list.component.scss'],
})
export class AirportListComponent implements OnInit {
  airports: Airport[];
  constructor(private airportService: AirportService) {
    this.airports = [];
  }

  ngOnInit(): void {
    this.showAirports();
  }

  showAirports(): void {
    this.airportService
      .getAirports()
      .subscribe((data: Airport[]) => (this.airports = data));
  }
}
