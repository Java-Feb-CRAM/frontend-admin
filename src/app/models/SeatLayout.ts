import { SeatGroup } from './SeatGroup';

export class SeatLayout {
  public id: number;
  public seatGroups: SeatGroup[];
  constructor(id: number, seatGroups: SeatGroup[]) {
    this.id = id;
    this.seatGroups = seatGroups;
  }
}
