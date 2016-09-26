import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Wonder } from '../components/home/home.component';

import 'rxjs/Rx';

@Injectable()
export class WonderService {
  constructor(private http: Http) {}

  private wonderUrl = 'api/wonders';

  getWonders(): Observable<Wonder[]> {
    return this.http.get(this.wonderUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  saveWonder() {

  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
