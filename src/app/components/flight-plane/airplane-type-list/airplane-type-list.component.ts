import { Component, OnInit } from '@angular/core';
import { AirplaneType } from '../../../models/AirplaneType';
import { AirplaneTypeService } from '../../../services/airplane-type.service';

@Component({
  selector: 'app-airplane-type-list',
  templateUrl: './airplane-type-list.component.html',
  styleUrls: ['./airplane-type-list.component.scss'],
})
export class AirplaneTypeListComponent implements OnInit {
  airplaneTypes: AirplaneType[];
  constructor(private airplaneTypeService: AirplaneTypeService) {
    this.airplaneTypes = [];
  }

  ngOnInit(): void {
    this.showAirplaneTypes();
  }

  showAirplaneTypes(): void {
    this.airplaneTypeService
      .getAirplaneTypes()
      .subscribe((data: AirplaneType[]) => (this.airplaneTypes = data));
  }
}
