import {Injectable} from '@angular/core';
import { HttpIntercept } from './auth.service';

@Injectable()
export class UserService {
    constructor(private http: HttpIntercept) { }


}
