import { Component, OnInit } from '@angular/core';
import { Airplane } from '../models/Airplane';
import { AirplaneService } from '../airplane.service';

@Component({
  selector: 'app-airplane-list',
  templateUrl: './airplane-list.component.html',
  styleUrls: ['./airplane-list.component.scss'],
})
export class AirplaneListComponent implements OnInit {
  airplanes: Airplane[];
  constructor(private airplaneService: AirplaneService) {
    this.airplanes = [];
  }

  ngOnInit(): void {
    this.showAirplanes();
  }

  showAirplanes(): void {
    this.airplaneService
      .getAirplanes()
      .subscribe((data: Airplane[]) => (this.airplanes = data));
  }
}
