import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WonderService {
  constructor(private http: Http) { }

  private url = 'api/wonders';

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const body = JSON.parse(error._body);
    const errMsg = (body.message) ? body.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw({
      status: error.status,
      statusText: error.statusText,
      url: error.url,
      message: errMsg
    });
  }

  // get all wonders and map the object to the get a json
  getWonders(): Observable<any> {
    return this.http.get(this.url)
      .map(res => res.json())
      .catch(this.handleError);
  }

  saveWonder(wonder: string): Observable<any> {
    let body = JSON.stringify({
      name: wonder
    });

    return this.http.post(this.url, body)
      .map(res => res.json())
      .catch(this.handleError);
  }
}
