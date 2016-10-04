import { Injectable } from '@angular/core';
import{ Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Injectable()

export class ClockService {
  period: string = "AM";
  currentTime = Observable.interval(1000).map(()=> new Date());

  subscription = this.currentTime.subscribe(x => {
    if(x.getHours() < 12) {
      this.period = "AM";
    }
    else {
      this.period = "PM";
    }

  });

}
