import { Injectable } from '@angular/core';
import{ Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';

@Injectable()
export class ClockService {

  sunRise: boolean = false;
  dayTime: boolean = false;
  sunSet: boolean = false;
  nightTime: boolean = false;

  //creates an observable which returns the date object every second
  currentTime = Observable.interval(1000).map(()=> new Date());

  //sets the time of day in real time
  setTOD = this.currentTime.subscribe(time => {

    if(time.getHours() === 5 || time.getHours() === 6) {
      this.sunRise = true;
      this.dayTime = false;
      this.sunSet = false;
      this.nightTime = false;
    }
    else if(time.getHours() >= 7 && time.getHours() <= 17) {
      this.sunRise = false;
      this.dayTime = true;
      this.sunSet = false;
      this.nightTime = false;
    }
    else if(time.getHours() === 18 || time.getHours() === 19) {
      this.sunRise = false;
      this.dayTime = false;
      this.sunSet = true;
      this.nightTime = false;
    }
    else {
      this.sunRise = false;
      this.dayTime = false;
      this.sunSet = false;
      this.nightTime = true;
    }

  });

}
