import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/index';

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

    constructor(private ngRedux: NgRedux<IAppState>) { }

    static SUN_RISE: string = 'SUN_RISE';
    static SUN_SET: string = 'SUN_SET';
    static DAY_TIME: string = 'DAY_TIME';
    static NIGHT_TIME: string = 'NIGHT_TIME';

    timeOfDay(time: any): any {

      if (time > 4 && time <= 6) {
        this.ngRedux.dispatch({
          type: TimeOfDayActions.SUN_RISE,
          payload: {
            cloudBrightness: '100%',
            skySvg: '../assets/day-sky.svg',

            goatSvg: '../assets/awake-goat.svg',
            mountainSvg: '../assets/day-mountain.svg',
            islandSvg: '../assets/day-island.svg',
            treeSvg: '../assets/day-trees.svg',

            oceanSvg: '../assets/day-ocean.svg',
            whaleSvg: '../assets/day-whale.svg'
          }
        });
      }
      else if(time < 18 && time > 6) {
        this.ngRedux.dispatch({
          type: TimeOfDayActions.DAY_TIME,
          payload: {
            cloudBrightness: '100%',
            skySvg: '../assets/day-sky.svg',

            goatSvg: '../assets/awake-goat.svg',
            mountainSvg: '../assets/day-mountain.svg',
            islandSvg: '../assets/day-island.svg',
            treeSvg: '../assets/day-trees.svg',

            oceanSvg: '../assets/day-ocean.svg',
            whaleSvg: '../assets/day-whale.svg'
          }
        });
      }
      else if(time >= 18 && time < 20) {
        this.ngRedux.dispatch({
          type: TimeOfDayActions.SUN_SET,
          payload: {
            cloudBrightness: '100%',
            skySvg: '../assets/day-sky.svg',

            goatSvg: '../assets/awake-goat.svg',
            mountainSvg: '../assets/day-mountain.svg',
            islandSvg: '../assets/day-island.svg',
            treeSvg: '../assets/day-trees.svg',

            oceanSvg: '../assets/day-ocean.svg',
            whaleSvg: '../assets/day-whale.svg'
          }
        });
      }
      else {
        this.ngRedux.dispatch({
          type: TimeOfDayActions.NIGHT_TIME,
          payload: {
            cloudBrightness: '100%',
            skySvg: '../assets/day-sky.svg',

            goatSvg: '../assets/awake-goat.svg',
            mountainSvg: '../assets/day-mountain.svg',
            islandSvg: '../assets/day-island.svg',
            treeSvg: '../assets/day-trees.svg',

            oceanSvg: '../assets/day-ocean.svg',
            whaleSvg: '../assets/day-whale.svg'
          }
        });
      }
    }
  }
