import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Wonder, mapWonders, mapWonder } from '../../models/models.namespace';

@Injectable()
export class WonderService {
  constructor(private http: Http) { }

  private url = 'api/wonders';

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let body = JSON.parse(error._body);
    
    let errMsg = (body.message) ? body.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }

  getWonders(): Observable<Wonder[]> {
    return this.http.get(this.url)
      .map(mapWonders)
      .catch(this.handleError);
  }

  saveWonder(wonder: string): Observable<Wonder> {
    let body = JSON.stringify({
      name: wonder
    });

    return this.http.post(this.url, body)
      .map(mapWonder)
      .catch(this.handleError);
  }
}
