import { Airplane } from './Airplane';
import { Route } from './Route';

export class Flight {
  public id: number;
  public route: Route;
  public airplane: Airplane;
  public departureTime: Date;
  public reservedSeats: number;
  public seatPrice: number;
}
