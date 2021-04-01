import { User } from './User';

export class UserRole {
  public id: number;
  public token: string;
  public user: User;
  public expiryDate: Date;

  constructor(id: number, token: string, user: User, expiryDate: Date) {
    this.id = id;
    this.token = string;
    this.user = User;
    this.expiryDate = Date;
  }
}
