export class Users {
  constructor(
    public id: number,
    public username: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: number,
    public address: string,
    public image: string,
    public role: number
  ) {}
}
