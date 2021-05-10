import { Component, Input, OnInit } from '@angular/core';
import { SeatLocation } from '../../../models/SeatLocation';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.scss'],
})
export class SeatComponent implements OnInit {
  @Input() seatLocation: SeatLocation = new SeatLocation(0, 0, 0, ' ', 0);
  constructor() {}

  ngOnInit(): void {}
}
