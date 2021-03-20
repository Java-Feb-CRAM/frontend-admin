import { Airport } from './Airport';

export class Route {
  public id: number;
  public originAirport: Airport;
  public destinationAirport: Airport;

  constructor(id: number, originAirport: Airport, destinationAirport: Airport) {
    this.id = id;
    this.originAirport = originAirport;
    this.destinationAirport = destinationAirport;
  }
}
