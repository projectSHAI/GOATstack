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
              .updateIn(['nightTime'], val => false)
              .updateIn(['cloudBrightness'], val => 'brightness(100%)')
              .updateIn(['skyColor'], val => 'linear-gradient(to bottom, #ffffff 0%,#6abfeb 100%)')
              .updateIn(['mountainGoatSvg'], val => '/public/assets/day-mountain-goat.svg')
              .updateIn(['islandSvg'], val => '/public/assets/day-island.svg')
              .updateIn(['oceanOverlaySvg'], val => '/public/assets/day-ocean-overlay.svg')
              .updateIn(['whaleSvg'], val => '/public/assets/day-whale.svg')
              .updateIn(['sunMoonGlow'], val => '0px 0px 100px 12px yellow')
              .updateIn(['sunMoonBorder'], val => 'rgba(255,255,0, 0.3)');
    case TimeOfDayActions.NIGHT_TIME:
      return state
              .updateIn(['nightTime'], val => 'white')
              .updateIn(['nightTime'], val => true)
              .updateIn(['cloudBrightness'], val => 'brightness(30%)')
              .updateIn(['skyColor'], val => 'linear-gradient(to bottom, #000000 0%,#140f28 100%)')
              .updateIn(['mountainGoatSvg'], val => '/public/assets/night-mountain-goat.svg')
              .updateIn(['islandSvg'], val => '/public/assets/night-island.svg')
              .updateIn(['oceanOverlaySvg'], val => '/public/assets/night-ocean-overlay.svg')
              .updateIn(['whaleSvg'], val => '/public/assets/night-whale.svg')
              .updateIn(['sunMoonGlow'], val => '0px 0px 100px 12px #7c4dff')
              .updateIn(['sunMoonBorder'], val => 'rgba(102,51,153, 0.3)');
    default:
      return state;
  }
}
// background: -moz-linear-gradient(top,  #000000 0%, #000000 6%, #000000 6%, #0c0919 44%, #0c0919 44%, #140f28 100%); /* FF3.6-15 */
// background: -webkit-linear-gradient(top,  #000000 0%,#000000 6%,#000000 6%,#0c0919 44%,#0c0919 44%,#140f28 100%); /* Chrome10-25,Safari5.1-6 */
// background: ; /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
