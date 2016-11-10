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
              .updateIn(['cloudBrightness'], val => 'brightness(50%)')
              .updateIn(['skySvg'], val => '../assets/day-sky.svg')
              .updateIn(['mountainSvg'], val => '../assets/day-mountain.svg')
              .updateIn(['islandSvg'], val => '../assets/day-island.svg')
              .updateIn(['treeSvg'], val => '../assets/day-trees.svg')
              .updateIn(['oceanSvg'], val => '../assets/day-ocean.svg');
    case TimeOfDayActions.DAY_TIME:
      return state
              .updateIn(['cloudBrightness'], val => 'brightness(10%)')
              .updateIn(['skySvg'], val => '../assets/day-sky.svg')
              .updateIn(['goatSvg'], val => '../assets/awake-goat.svg')
              .updateIn(['mountainSvg'], val => '../assets/day-mountain.svg')
              .updateIn(['islandSvg'], val => '../assets/day-island.svg')
              .updateIn(['treeSvg'], val => '../assets/day-trees.svg')
              .updateIn(['oceanSvg'], val => '../assets/day-ocean.svg')
              .updateIn(['whaleSvg'], val => '../assets/day-whale.svg');
    case TimeOfDayActions.SUN_SET:
      return state
              .updateIn(['cloudBrightness'], val => 'brightness(100%)')
              .updateIn(['skySvg'], val => '../assets/day-sky.svg')
              .updateIn(['mountainSvg'], val => '../assets/day-mountain.svg')
              .updateIn(['islandSvg'], val => '../assets/day-island.svg')
              .updateIn(['treeSvg'], val => '../assets/day-trees.svg')
              .updateIn(['oceanSvg'], val => '../assets/day-ocean.svg');
    case TimeOfDayActions.NIGHT_TIME:
      return state
              .updateIn(['cloudBrightness'], val => 'brightness(30%)')
              .updateIn(['skySvg'], val => '../assets/day-sky.svg')
              .updateIn(['goatSvg'], val => '../assets/awake-goat.svg')
              .updateIn(['mountainSvg'], val => '../assets/day-mountain.svg')
              .updateIn(['islandSvg'], val => '../assets/day-island.svg')
              .updateIn(['treeSvg'], val => '../assets/day-trees.svg')
              .updateIn(['oceanSvg'], val => '../assets/day-ocean.svg')
              .updateIn(['whaleSvg'], val => '../assets/day-whale.svg');
    default:
      return state;
  }
}
