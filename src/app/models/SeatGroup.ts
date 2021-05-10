import { SeatColumn } from '../interfaces/SeatColumn';
import { SeatLocation } from './SeatLocation';

export class SeatGroup {
  public id: number;
  public name: string;
  public columns: SeatColumn[];
  public seatLocations: SeatLocation[];
  public greatestRow = 0;
  constructor(
    id: number,
    name: string,
    columns: SeatColumn[],
    seatLocations: SeatLocation[]
  ) {
    this.id = id;
    this.name = name;
    this.columns = columns;
    this.seatLocations = seatLocations;
    this.seatLocations.forEach((seat) => {
      if (seat.row > this.greatestRow) {
        this.greatestRow = seat.row;
      }
    });
  }
}
