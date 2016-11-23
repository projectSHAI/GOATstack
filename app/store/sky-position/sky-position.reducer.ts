import { SkyPositionActions } from '../../actions/sky-position/sky-position.actions';
import { reimmutifySkyPosition } from './sky-position.transformers';
import { ISkyPosition } from './sky-position.types';

import { INITIAL_STATE } from './sky-position.initial-state';

// define the reducer for error attribute in store
export function skyPositionReducer(state: ISkyPosition = INITIAL_STATE, action: any) {

  // Depending on the incoming state 'type' execute corresponding state change
  switch(action.type) {
    case SkyPositionActions.UPDATE_SKY_POSITION:
      return state
              .updateIn(['toSkyIsland'], val => !state.getIn(['toSkyIsland']));          
    default:
      return state;
  }
}
