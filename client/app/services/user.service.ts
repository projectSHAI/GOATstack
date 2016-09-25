import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import { CookieService } from 'angular2-cookie/core';

import { User } from '../components/header/header.component';

@Injectable()
export class UserService {
    constructor(private http: Http) {}

    private authUrl = 'auth/local';
    private userUrl = 'api/user';

    login(email: string, password: string): Promise<User> {
      console.log('inside login');
      let body = JSON.stringify({
        email: email,
        password: password
      });

      return this.http.post(this.authUrl, body)
        .toPromise()
        .then(this.extractToken_Data)
        .catch(this.handleError);
    }

    private extractToken_Data(res: Response) {
      let body = res.json();
      console.log(body);
      // this._cookieservice.put('token', body.data.token);
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
