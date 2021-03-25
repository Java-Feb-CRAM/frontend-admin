export class CreateFlightDto {
  public routeId: number;
  public airplaneId: number;
  public departureTime: Date;
  public reservedSeats: number;
  public seatPrice: number;

  constructor(
    routeId: number,
    airplaneId: number,
    departureTime: Date,
    reservedSeats: number,
    seatPrice: number
  ) {
    this.routeId = routeId;
    this.airplaneId = airplaneId;
    this.departureTime = departureTime;
    this.reservedSeats = reservedSeats;
    this.seatPrice = seatPrice;
  }
}
