export class CreateAirplaneDto {
  public airplaneTypeId: number;
  constructor(airplaneTypeId: number) {
    this.airplaneTypeId = airplaneTypeId;
  }
}
