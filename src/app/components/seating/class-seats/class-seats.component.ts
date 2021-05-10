import { Component, Input, OnInit } from '@angular/core';
import { SeatGroup } from '../../../models/SeatGroup';
import { SeatColumn } from '../../../interfaces/SeatColumn';
import { SeatLocation } from '../../../models/SeatLocation';

@Component({
  selector: 'app-class-seats',
  templateUrl: './class-seats.component.html',
  styleUrls: ['./class-seats.component.scss'],
})
export class ClassSeatsComponent implements OnInit {
  @Input() seatGroup: SeatGroup = new SeatGroup(0, '', [], []);
  minRow = Number.MAX_SAFE_INTEGER;
  maxRow = Number.MIN_SAFE_INTEGER;
  rows: number[] = [];
  constructor() {}

  rowHasSeats(row: number): boolean {
    return (
      this.seatGroup.seatLocations.filter((seat) => seat.row === row).length > 0
    );
  }

  getSeat(row: number, col: SeatColumn): SeatLocation | undefined {
    return this.seatGroup.seatLocations.find(
      (seat) => seat.row === row && seat.col === col
    );
  }

  ngOnInit(): void {
    this.seatGroup.seatLocations.forEach((seat) => {
      if (seat.row > this.maxRow) {
        this.maxRow = seat.row;
      }
      if (seat.row < this.minRow) {
        this.minRow = seat.row;
      }
    });
    for (let i = this.minRow; i <= this.maxRow; i++) {
      this.rows.push(i);
    }
  }
}
