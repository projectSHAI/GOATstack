import { Injectable } from '@angular/core';
import { Http, Request, RequestOptionsArgs, Response, XHRBackend, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
// import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
// import * as _ from 'lodash';
// var _ = require('lodash');

@Injectable()
export class HttpIntercept extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, this.getRequestOptionArgs(options));
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.get(url, this.getRequestOptionArgs(options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.post(url, body, this.getRequestOptionArgs(options));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.put(url, body, this.getRequestOptionArgs(options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.delete(url, this.getRequestOptionArgs(options));
    }

    getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        var jwt = '3216040189flight';

        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Authorization', 'Bearer ' + jwt);
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
    //     });
    //
    // }

}
