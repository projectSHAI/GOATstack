import { ZoomActions } from '../../island-segment/actions/zoom/zoom.actions';
import { reimmutifyZoom } from './zoom.transformers';
import { IZoom } from './zoom.types';

import { INITIAL_STATE } from './zoom.initial-state';

// define the reducer for error attribute in store
export function zoomReducer(state: IZoom = INITIAL_STATE, action: any) {

  // Depending on the incoming state 'type' execute corresponding state change
  switch(action.type) {
    case ZoomActions.UPDATE_SHOW_HIDE:
      return state
              .updateIn(['showHide'], val => !state.getIn(['showHide']));          
    default:
      return state;
  }
}
