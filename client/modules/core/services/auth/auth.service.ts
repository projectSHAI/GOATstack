import { Injectable } from '@angular/core';
import { Http, Request, RequestOptionsArgs, Response, XHRBackend, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
// import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import * as _ from 'lodash';

// Extending the Http class so connect a OAuth token if present in the cookies
// When the request is recieved on the server authenticated endpoints will 
// have varification that give them the ability to execute
@Injectable()
export class HttpIntercept extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, this.getRequestOptionArgs(false, options));
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.get(url, this.getRequestOptionArgs(false, options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.post(url, body, this.getRequestOptionArgs(true, options));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.put(url, body, this.getRequestOptionArgs(true, options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.delete(url, this.getRequestOptionArgs(false, options));
    }

    // appends the Bearer token to the header
    getRequestOptionArgs(sendJSON: boolean, options?: RequestOptionsArgs): RequestOptionsArgs {
        let token = Cookie.get('token');

        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }

        if (sendJSON)
          options.headers.append('Content-Type', 'application/json');
        if (token)
          options.headers.append('Authorization', 'Bearer ' + token);

        return options;
    }

    // intercept(observable: Observable<Response>): Observable<Response> {
    //     return observable.catch((err, source) => {
    //         if (err.status == 401 && !_.endsWith(err.url, 'api/auth/login')) {
    //             this._router.navigate(['/login']);
    //             return Observable.empty();
    //         } else {
    //             return Observable.throw(err);
    //         }
    //     });    //
    // }

}
