import { Component, OnInit } from '@angular/core';
import { Airplane } from '../../../models/Airplane';
import { AirplaneService } from '../../../services/airplane.service';
import { AirplaneType } from '../../../models/AirplaneType';
import { AirplaneTypeService } from '../../../services/airplane-type.service';
import { CreateAirplaneDto } from '../dto/CreateAirplaneDto';

@Component({
  selector: 'app-airplane-list',
  templateUrl: './airplane-list.component.html',
  styleUrls: ['./airplane-list.component.scss'],
})
export class AirplaneListComponent implements OnInit {
  airplanes: Airplane[];
  airplaneTypes: AirplaneType[];
  model = new CreateAirplaneDto(0);
  submitted = false;
  constructor(
    private airplaneService: AirplaneService,
    private airplaneTypeService: AirplaneTypeService
  ) {
    this.airplanes = [];
    this.airplaneTypes = [];
  }

  ngOnInit(): void {
    this.getAllAirplanes();
    this.getAllAirplaneTypes();
  }

  onSubmit(): void {
    this.submitted = true;
    this.createAirplane(this.model);
  }

  createAirplane(createAirplaneDto: CreateAirplaneDto): void {
    this.airplaneService
      .createAirplane(createAirplaneDto)
      .subscribe((airplane) => this.airplanes.push(airplane));
  }

  deleteAirplane(airplaneId: number): void {
    this.airplaneService
      .deleteAirplane(airplaneId)
      .subscribe(
        () =>
          (this.airplanes = this.airplanes.filter(
            (airplane) => airplane.id !== airplaneId
          ))
      );
  }

  getAllAirplanes(): void {
    this.airplaneService
      .getAllAirplanes()
      .subscribe((data: Airplane[]) => (this.airplanes = data));
  }

  getAllAirplaneTypes(): void {
    this.airplaneTypeService
      .getAirplaneTypes()
      .subscribe((data: AirplaneType[]) => (this.airplaneTypes = data));
  }

  get diagnostic(): string {
    return JSON.stringify(this.model);
  }
}
