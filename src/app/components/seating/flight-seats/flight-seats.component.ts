import { Component, Input, OnInit } from '@angular/core';
import { SeatLayout } from '../../../models/SeatLayout';

@Component({
  selector: 'app-flight-seats',
  templateUrl: './flight-seats.component.html',
  styleUrls: ['./flight-seats.component.scss'],
})
export class FlightSeatsComponent implements OnInit {
  @Input() seatLayout: SeatLayout = new SeatLayout(0, []);
  constructor() {}

  ngOnInit(): void {
    this.seatLayout.seatGroups = this.seatLayout.seatGroups.sort(
      (a, b) => a.greatestRow - b.greatestRow
    );
  }
}
