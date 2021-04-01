import { UserRole } from './UserRole';

export class User {
  public id: number;
  public userRole: UserRole;
  public givenName: string;
  public familyName: string;
  public username: string;
  public active: boolean;
  public email: string;
  public password: string;
  public phone: string;

  constructor(id: number, userRole: UserRole,
      givenName: string, familyName: string,
      username: string, active: boolean,
      email: string, password: string,
      phone: string)
  {
    this.id = id;
    this.userRole = userRole;
    this.givenName = givenName;
    this.familyName = familyName;
    this.username = username;
    this.active = active;
    this.email = email;
    this.password = password;
    this.phone = phone;
  }
}
