import { Response } from '@angular/http';
import { Universal } from '../universal/universal.model';

export class User extends Universal {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;

  constructor(body: any) {
    super();
    this._id = body._id;
    this.userName = body.userName;
    this.firstName = body.firstName;
    this.lastName = body.lastName;

    this.email = body.email;
    this.created = body.created;
    this.role = body.role;
  }

  replace(body: any) {
    super.replace(body);
    this.userName = body.userName;
    this.firstName = body.firstName;
    this.lastName = body.lastName;

    this.email = body.email;
    this.role = body.role;
  }
}

export function mapUser(res: Response): User {
  return toUser(res.json());
}

function toUser(body: any): User {
  return new User(body);
}
