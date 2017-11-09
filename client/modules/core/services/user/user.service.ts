import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import 'rxjs/Rx';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  // Private variables that only this service can use
  private authUrl = 'auth/local';
  private userUrl = 'api/users';

  private extractToken(res: HttpResponse<any>) {

    Cookie.set('token', res.token);
    return res.user;
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    const body = JSON.parse(error._body);
    let errMsg;

    if (body.errors) {
      errMsg = body.errors.username ? body.errors.username : body.errors.email;
    } else {
      errMsg = body ? body :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    }

    return Observable.throw({
      status: error.status,
      statusText: error.statusText,
      url: error.url,
      message: errMsg.message
    });
  }

  // This is called when there is a cookie OAuth token
  // present in the browser so the user will automatically
  // sign in
  getMe(): Observable<any> {
    return this.http.get(this.userUrl + '/me')
      .catch(this.handleError);
  }

  login(email: string, password: string): Observable<any> {
    let body = JSON.stringify({
      email: email,
      password: password
    });

    return this.http.post(this.authUrl, body)
      .map(this.extractToken)
      .catch(this.handleError);
  }

  signup(username: string, email: string, password: string): Observable<any> {
    let body = JSON.stringify({
      username: username,
      email: email,
      password: password
    });
    return this.http.post(this.userUrl, body)
      .map(this.extractToken)
      .catch(this.handleError);
  }
}
