import { Response } from '@angular/http';
import { Universal } from '../universal/universal.model';

export class Wonder extends Universal {
  name: string;
  xcoor: number;
  ycoor: number;

  constructor(body: any) {
    super(body);
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

export function cloneWonders(wonders: Wonder[]): Wonder[] {
  let wonders2: Wonder[] = new Array(10);

  wonders.forEach((item, index) => {
    wonders2[index] = new Wonder(item);
  });

  return wonders2;
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
