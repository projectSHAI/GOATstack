import { Map } from 'immutable';
import { ISkyPosition, ISkyPositionItems } from './sky-position.types';

// functions to change the state of the data
// either immutable -> mutable or mutable -> immutable
export function deimmutifySkyPosition(state: ISkyPosition): Object {
  return state.toJS();
}

export function reimmutifySkyPosition(plain): ISkyPosition {
  return Map<ISkyPositionItems, ISkyPositionItems>(plain ? plain : {});
}
