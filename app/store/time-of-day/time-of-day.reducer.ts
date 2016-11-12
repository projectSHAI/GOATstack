import { TimeOfDayActions } from '../../actions/time-of-day/time-of-day.actions';
import { reimmutifyTimeOfDay } from './time-of-day.transformers';
import { ITimeOfDay } from './time-of-day.types';

import { INITIAL_STATE } from './time-of-day.initial-state';

// define the reducer for error attribute in store
export function timeOfDayReducer(state: ITimeOfDay = INITIAL_STATE, action: any) {

  // Depending on the incoming state 'type' execute corresponding state change
  switch(action.type) {
    case TimeOfDayActions.SUN_RISE:
      return state
              .updateIn(['cloudBrightness'], val => 'brightness(70%)')
              .updateIn(['skySvg'], val => '../assets/morning-sky.svg')
              .updateIn(['mountainSvg'], val => '../assets/morning-mountain.svg')
              .updateIn(['islandSvg'], val => '../assets/morning-island.svg')
              .updateIn(['treeSvg'], val => '../assets/morning-trees.svg')
              .updateIn(['oceanBrightness'], val => 'brightness(70%)')
              .updateIn(['oceanFrontBrightness'], val => 'brightness(70%)')
              .updateIn(['sunMoonGlow'], val => '0px 0px 100px 12px orange')
              .updateIn(['sunMoonBorder'], val => 'rgba(255,129,0, 0.3)');
    case TimeOfDayActions.DAY_TIME:
      return state
              .updateIn(['cloudBrightness'], val => 'brightness(100%)')
              .updateIn(['skySvg'], val => '../assets/day-sky.svg')
              .updateIn(['goatSvg'], val => '../assets/awake-goat.svg')
              .updateIn(['mountainSvg'], val => '../assets/day-mountain.svg')
              .updateIn(['islandSvg'], val => '../assets/day-island.svg')
              .updateIn(['treeSvg'], val => '../assets/day-trees.svg')
              .updateIn(['oceanBrightness'], val => 'brightness(100%)')
              .updateIn(['oceanFrontBrightness'], val => 'brightness(100%)')
              .updateIn(['whaleSvg'], val => '../assets/day-whale.svg')
              .updateIn(['sunMoonGlow'], val => '0px 0px 100px 12px yellow')
              .updateIn(['sunMoonBorder'], val => 'rgba(255,255,0, 0.3)');
    case TimeOfDayActions.SUN_SET:
      return state
              .updateIn(['cloudBrightness'], val => 'brightness(70%)')
              .updateIn(['skySvg'], val => '../assets/evening-sky.svg')
              .updateIn(['mountainSvg'], val => '../assets/evening-mountain.svg')
              .updateIn(['islandSvg'], val => '../assets/evening-island.svg')
              .updateIn(['treeSvg'], val => '../assets/evening-trees.svg')
              .updateIn(['oceanBrightness'], val => 'brightness(70%)')
              .updateIn(['oceanFrontBrightness'], val => 'brightness(70%)')
              .updateIn(['sunMoonGlow'], val => '0px 0px 100px 12px orange')
              .updateIn(['sunMoonBorder'], val => 'rgba(255,129,0, 0.3)');
    case TimeOfDayActions.NIGHT_TIME:
      return state
              .updateIn(['cloudBrightness'], val => 'brightness(30%)')
              .updateIn(['skySvg'], val => '../assets/night-sky.svg')
              .updateIn(['goatSvg'], val => '../assets/sleeping-goat.svg')
              .updateIn(['mountainSvg'], val => '../assets/night-mountain.svg')
              .updateIn(['islandSvg'], val => '../assets/night-island.svg')
              .updateIn(['treeSvg'], val => '../assets/night-trees.svg')
              .updateIn(['oceanBrightness'], val => 'brightness(50%)')
              .updateIn(['oceanFrontBrightness'], val => 'brightness(50%)')
              .updateIn(['whaleSvg'], val => '../assets/night-whale.svg')
              .updateIn(['sunMoonGlow'], val => '0px 0px 100px 12px purple')
              .updateIn(['sunMoonBorder'], val => 'rgba(102,51,153, 0.3)');
    default:
      return state;
  }
}
