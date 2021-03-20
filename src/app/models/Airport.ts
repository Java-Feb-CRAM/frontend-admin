export class Airport {
  public iataId: string;
  public city: string;

  constructor(iataId: string, city: string) {
    this.iataId = iataId;
    this.city = city;
  }
}
