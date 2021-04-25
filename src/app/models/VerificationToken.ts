import { User } from './User';

export class UserRole {
  constructor(
    public id: number,
    public token: string,
    public user: User,
    public expiryDate: Date,
    ) 
  {
    this.id = id;
    this.token = token;
    this.user = user;
    this.expiryDate = expiryDate;
  }
}
