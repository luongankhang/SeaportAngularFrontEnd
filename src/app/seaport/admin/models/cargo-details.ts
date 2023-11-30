export class CargoDetails {
  constructor(
    public id: number,
    public cargoId: number,
    public cargoType: string,
    public cargoQuantity: number,
    public cargoStart: string,
    public cargoEnd: string,
    public cargoStartDate: string,
    public cargoStartTime: string,
    public cargoEndDate: string,
    public cargoEndTime: string
  ) {}
}
