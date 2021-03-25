import { Airplane } from './Airplane';
import { Route } from './Route';

export class Flight {
  public id: number;
  public route: Route;
  public airplane: Airplane;
  public departureTime: Date;
  public reservedSeats: number;
  public seatPrice: number;
  public bookings: any[];

  constructor(
    id: number,
    route: Route,
    airplane: Airplane,
    departureTime: Date,
    reservedSeats: number,
    seatPrice: number,
    bookings: any[]
  ) {
    this.id = id;
    this.route = route;
    this.airplane = airplane;
    this.departureTime = departureTime;
    this.reservedSeats = reservedSeats;
    this.seatPrice = seatPrice;
    this.bookings = bookings;
  }

  get noDelete(): boolean {
    return this.bookings && this.bookings.length > 0;
  }
}
