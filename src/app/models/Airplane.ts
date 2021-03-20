import { AirplaneType } from './AirplaneType';

export class Airplane {
  public id: number;
  public airplaneType: AirplaneType;
  constructor(id: number, airplaneType: AirplaneType) {
    this.id = id;
    this.airplaneType = airplaneType;
  }
}
