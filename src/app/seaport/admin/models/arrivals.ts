export class Arrivals {
  constructor(
    public id: number,
    public shipId: number,
    public berthId: number,
    public arrivalDate: string,
    public arrivalTime: string
  ) {}
}
