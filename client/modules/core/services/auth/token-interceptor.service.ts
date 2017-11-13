import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import * as _ from 'lodash';

// Extending the Http class so connect a OAuth token if present in the cookies
// When the request is recieved on the server authenticated endpoints will 
// have varification that give them the ability to execute
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // get the token from a service
        const authHeader = `Bearer ${Cookie.get('token')}`;
        const authReq = req.clone({setHeaders: {Authorization: authHeader}});

        if(authHeader)
            return next.handle(authReq);
        else
            return next.handle(req);    
    }

}
