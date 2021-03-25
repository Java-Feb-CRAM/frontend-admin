import { Component, OnInit } from '@angular/core';
import { CellStyle } from '../../data-table/data-table.component';
import { Airport } from '../../../models/Airport';
import { AirportService } from '../../../services/airport.service';
import { Flight } from '../../../models/Flight';
import { Route } from '../../../models/Route';

@Component({
  selector: 'app-manage-airports',
  templateUrl: './manage-airports.component.html',
  styleUrls: ['./manage-airports.component.scss'],
})
export class ManageAirportsComponent implements OnInit {
  airports: Airport[] = [];
  cellStyles: CellStyle[] = [CellStyle.NONE, CellStyle.NONE];
  constructor(private airportService: AirportService) {}

  ngOnInit(): void {
    this.getAllAirports();
  }

  getAllAirports(): void {
    this.airportService.getAirports().subscribe((data: Airport[]) => {
      data.forEach((airport) =>
        this.airports.push(
          new Airport(
            airport.iataId,
            airport.city,
            airport.arrivals,
            airport.departures
          )
        )
      );
    });
  }
}
