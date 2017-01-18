import { TimeOfDayActions } from '../../main-segment/actions/time-of-day/time-of-day.actions';
import { reimmutifyTimeOfDay } from './time-of-day.transformers';
import { ITimeOfDay } from './time-of-day.types';

import { INITIAL_STATE } from './time-of-day.initial-state';

// define the reducer for error attribute in store
export function timeOfDayReducer(state: ITimeOfDay = INITIAL_STATE, action: any) {

  // Depending on the incoming state 'type' execute corresponding state change
  switch(action.type) {
    case TimeOfDayActions.DAY_TIME:
      return state
              .updateIn(['titleColor'], val => 'black')
              .updateIn(['time'], val => 'day-time')
              .updateIn(['cloudBrightness'], val => 'brightness(100%)')
              .updateIn(['skyColor'], val => 'rgb(157, 211, 250)')
              .updateIn(['mountainGoatSvg'], val => 'public/assets/day-mountain-goat.png')
              .updateIn(['islandSvg'], val => 'public/assets/day-island.png')
              .updateIn(['whaleSvg'], val => 'public/assets/day-whale.png')
              .updateIn(['capSvg'], val => 'public/assets/epipelagic-cap-overlay-day.svg')
              .updateIn(['sunMoonGlow'], val => '0px 0px 100px 12px yellow')
              .updateIn(['sunMoonBorder'], val => 'rgba(255,255,0, 0.3)');
    case TimeOfDayActions.NIGHT_TIME:
      return state
              .updateIn(['titleColor'], val => 'white')
              .updateIn(['time'], val => 'night-time')
              .updateIn(['cloudBrightness'], val => 'brightness(30%)')
              .updateIn(['skyColor'], val => 'rgb(15, 12, 30)')
              .updateIn(['mountainGoatSvg'], val => 'public/assets/night-mountain-goat.png')
              .updateIn(['islandSvg'], val => 'public/assets/night-island.png')
              .updateIn(['whaleSvg'], val => 'public/assets/night-whale.png')
              .updateIn(['capSvg'], val => 'public/assets/epipelagic-cap-overlay-night.svg')
              .updateIn(['sunMoonGlow'], val => '0px 0px 100px 12px #7c4dff')
              .updateIn(['sunMoonBorder'], val => 'rgba(102,51,153, 0.3)');
    default:
      return state;
  }
}
// background: -moz-linear-gradient(top,  #000000 0%, #000000 6%, #000000 6%, #0c0919 44%, #0c0919 44%, #140f28 100%); /* FF3.6-15 */
// background: -webkit-linear-gradient(top,  #000000 0%,#000000 6%,#000000 6%,#0c0919 44%,#0c0919 44%,#140f28 100%); /* Chrome10-25,Safari5.1-6 */
// background: ; /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
