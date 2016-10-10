import { Response } from '@angular/http';
import { Universal } from '../universal/universal.model';

export class Wonder extends Universal {
  name: string;
  xcoor: number;
  ycoor: number;

  constructor(body: any) {
    super();
    this._id = body._id;
    this.created = body.created;
    this.name = body.name;
    this.xcoor = body.xcoor;
    this.ycoor = body.ycoor;
  }

  replace(body: any): void {
    super.replace(body);
    this.name = body.name;
    this.xcoor = body.xcoor;
    this.ycoor = body.ycoor;
  }

}

export function mapWonders(res: Response): Wonder[] {
  return res.json().map(toWonder);
}

export function mapWonder(res: Response): Wonder {
  return toWonder(res.json());
}

function toWonder(body: any): Wonder {
  return new Wonder(body);
}
