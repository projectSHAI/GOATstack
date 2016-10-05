export class User {
  _id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  created: string;
  role: string;

  constructor(body: any) {
    this._id = body._id;
    this.userName = body.userName;
    this.firstName = body.firstName;
    this.lastName = body.lastName;

    this.email = body.email;
    this.created = body.created;
    this.role = body.role;
  }
}
