import { Injectable } from '@angular/core';
import{ Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';

@Injectable()
export class ClockService {
  dayTime: boolean = true;
  currentTime = Observable.interval(1000).map(()=> new Date());

  subscription = this.currentTime.subscribe(x => {
    if(x.getHours() >= 6 && x.getHours() <= 18) {
      this.dayTime = true;
    }
    else {
      this.dayTime = false;
    }

  });

}
