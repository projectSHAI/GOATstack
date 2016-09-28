import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

import { Wonder } from '../components/home/home.component';

import 'rxjs/Rx';

@Injectable()
export class WonderService {
    constructor(private http: Http) { }

    private url = 'api/wonders';
    private socket;

    getWonders() {
        return this.http.get(this.url)
          .map(this.extractData)
          .catch(this.handleError);
        // return new Observable<Wonder>(observer => {
        //     this.socket = io('', {
        //         // Send auth token on connection, you will need to DI the Auth service above
        //         // 'query': 'token=' + Auth.getToken()
        //         path: '/socket.io-client'
        //     });
        //     this.socket.on('wonder:save', (data) => {
        //         console.log('inside the socket listener');
        //         observer.next(data);
        //     });
        //     return () => {
        //         this.socket.disconnect();
        //     };
        // });
    }

    saveWonder(wonder: string) {
        let body = JSON.stringify({
          name: wonder
        });

        return this.http.post(this.url, body)
          .map(this.extractData)
          .catch(this.handleError);
        // this.socket.emit('wonder:save', {name: wonder});
        // console.log('wonder emitted: ' + wonder);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
