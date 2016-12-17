import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store/index';
import{ Observable } from 'rxjs/Observable';

/////////////////////////////////////////////////////////
/* Time of day Actions: Used to call dispatches to change
      the time of day in the store

    SUN_RISE    ->  sets app to sun rise
    SUN_SET     ->  sets app to sun set
    DAY_TIME    ->  sets app to day time
    NIGHT_TIME  ->  sets app to night time
*/
////////////////////////////////////////////////////////
@Injectable()
export class TimeOfDayActions {

  private currentTime: any;
  private holdHour: number;

  static NIGHT_TIME: string = 'NIGHT_TIME';
  static DAY_TIME: string = 'DAY_TIME';

  constructor(private ngRedux: NgRedux<IAppState>) {
    //define the clock observable with a one second interval
    this.currentTime = Observable.interval(1000).map(()=> new Date());
    //subscribe to the time observable and fire the timeOfDay function every time it updates
    this.currentTime.subscribe(time => this.timeOfDay(time.getHours()));
  }

  getCurrentTime(): Observable<any> {
    return this.currentTime;
  }

  timeOfDay(time: any): any {
    if ((time >= 6 && time < 18) && !(this.holdHour >= 6 && this.holdHour < 18)) {
      this.ngRedux.dispatch({ type: TimeOfDayActions.DAY_TIME });
      this.holdHour = time;

    }
    else if (!this.holdHour) {
      this.ngRedux.dispatch({ type: TimeOfDayActions.NIGHT_TIME });
      this.holdHour = time;
    }
  }
}
