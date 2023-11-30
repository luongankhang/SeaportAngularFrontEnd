export class Departures {
  constructor(
    public id: number,
    public shipId: number,
    public berthId: number,
    public departureDate: string,
    public departureTime: string
  ) {}
}
