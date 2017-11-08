import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs/Rx';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import * as _ from 'lodash';

// Extending the Http class so connect a OAuth token if present in the cookies
// When the request is recieved on the server authenticated endpoints will 
// have varification that give them the ability to execute
@Injectable()
export class HttpIntercept implements HttpInterceptor {
    constructor(public auth: UserService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${Cookie.get('Token')}`
            }
        }); 

        return next.handle(req);
    }

}
