import { TimeOfDayActions } from '../../actions/time-of-day/time-of-day.actions';
import { reimmutifyTimeOfDay } from './time-of-day.transformers';
import { ITimeOfDay } from './time-of-day.types';

import { INITIAL_STATE } from './time-of-day.initial-state';

// define the reducer for error attribute in store
export function timeOfDayReducer(state: ITimeOfDay = INITIAL_STATE, action: any) {

  // Depending on the incoming state 'type' execute corresponding state change
  switch(action.type) {
    case TimeOfDayActions.DAY_TIME:
      return state
              .updateIn(['cloudBrightness'], val => 'brightness(100%)')
              .updateIn(['skyColor'], val => '#6abfeb')
              .updateIn(['mountainGoatSvg'], val => 'assets/day-mountain-goat.svg')
              .updateIn(['islandSvg'], val => 'assets/day-island.svg')
              .updateIn(['oceanOverlaySvg'], val => 'assets/day-ocean-overlay.svg')
              .updateIn(['whaleSvg'], val => 'assets/day-whale.svg')
              .updateIn(['sunMoonGlow'], val => '0px 0px 100px 12px yellow')
              .updateIn(['sunMoonBorder'], val => 'rgba(255,255,0, 0.3)');
    case TimeOfDayActions.NIGHT_TIME:
      return state
              .updateIn(['cloudBrightness'], val => 'brightness(30%)')
              .updateIn(['skyColor'], val => '#140f28')
              .updateIn(['mountainGoatSvg'], val => 'assets/night-mountain-goat.svg')
              .updateIn(['islandSvg'], val => 'assets/night-island.svg')
              .updateIn(['oceanOverlaySvg'], val => 'assets/night-ocean-overlay.svg')
              .updateIn(['whaleSvg'], val => 'assets/night-whale.svg')
              .updateIn(['sunMoonGlow'], val => '0px 0px 100px 12px purple')
              .updateIn(['sunMoonBorder'], val => 'rgba(102,51,153, 0.3)');
    default:
      return state;
  }
}
