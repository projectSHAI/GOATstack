import { Response } from '@angular/http';

export class Universal {
  _id: string;
  created: string;

  replace(body: any): void {
    this._id = body._id;
    this.created = body.created;
  }
}
