import { TimeOfDayActions } from '../../actions/time-of-day/time-of-day.actions';
import { reimmutifyTimeOfDay } from './time-of-day.transformers';
import { ITimeOfDay } from './time-of-day.types';

import { INITIAL_STATE } from './time-of-day.initial-state';

// define the reducer for error attribute in store
export function timeOfDayReducer(state: ITimeOfDay = INITIAL_STATE, action: any) {
  // Depending on the incoming state 'type' execute corresponding state change
  switch(action.type) {
    case TimeOfDayActions.SUN_RISE:
      return state.updateIn(['styles'], val => action.payload);
    case TimeOfDayActions.DAY_TIME:
      return state.updateIn(['styles'], val => action.payload);
    case TimeOfDayActions.SUN_SET:
      return state.updateIn(['styles'], val => action.payload);
    case TimeOfDayActions.NIGHT_TIME:
      return state.updateIn(['styles'], val => action.payload);      
    default:
      return state;
  }
}
