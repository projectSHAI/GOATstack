import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import 'rxjs/Rx';

//instead of HttpResponse<any> create custom response interface for extractToken
interface tokenExtraction {
  token: string,
  user: {
    created: string,
    email: string,
    provider: string,
    role: string,
    username: string
  }
}

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  // Private variables that only this service can use
  private authUrl = 'auth/local';
  private userUrl = 'api/users';

  private extractToken(res: tokenExtraction) {
    Cookie.set('token', res.token);
    return res.user;
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    console.log('errorhandler', error);
    let errMsg;

    if (error.errors) {
      errMsg = error.errors.username ? error.errors.username : error.errors.email;
    } else {
      errMsg = error ? error :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    }

    return Observable.throw({
      status: error.status,
      statusText: error.statusText,
      url: error.url,
      message: errMsg.error.message
    });
  }

  // This is called when there is a cookie OAuth token
  // present in the browser so the user will automatically
  // sign in
  autoLogin(): Observable<any> {
    return this.http.get(this.userUrl + '/me')
      .catch(this.handleError);
  }

  login(email: string, password: string): Observable<any> {
    let body = {
      email: email,
      password: password
    };

    return this.http.post(this.authUrl, body)
      .map(this.extractToken)
      .catch(this.handleError);
  }

  signup(username: string, email: string, password: string): Observable<any> {
    let body = {
      username: username,
      email: email,
      password: password
    };
    return this.http.post(this.userUrl, body)
      .map(this.extractToken)
      .catch(this.handleError);
  }
}
