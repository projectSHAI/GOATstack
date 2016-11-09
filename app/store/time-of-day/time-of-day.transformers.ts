import { Map } from 'immutable';
import { ITimeOfDay, ITimeOfDayItems } from './time-of-day.types';

// functions to change the state of the data
// either immutable -> mutable or mutable -> immutable
export function deimmutifyTimeOfDay(state: ITimeOfDay): Object {
  return state.toJS();
}

export function reimmutifyTimeOfDay(plain): ITimeOfDay {
  return Map<ITimeOfDayItems, ITimeOfDayItems>(plain ? plain : {});
}
