import { Airplane } from './Airplane';
import { SeatLayout } from './SeatLayout';

export class AirplaneType {
  public id: number;
  public maxCapacity: number;
  public seatLayout: SeatLayout;
  public airplanes: Airplane[];

  constructor(
    id: number,
    maxCapacity: number,
    seatLayout: SeatLayout,
    airplanes: Airplane[]
  ) {
    this.id = id;
    this.maxCapacity = maxCapacity;
    this.seatLayout = seatLayout;
    this.airplanes = airplanes;
  }

  get noDelete(): boolean {
    return this.airplanes && this.airplanes.length > 0;
  }
}
