import { WonderActions } from '../actions/wonder.actions';
import { Wonder } from '../models/models.namespace';

const INITIAL_STATE: any = {
  beforeWonders: [],
  afterWonders: []
};

export function wonderReducer(state: any = INITIAL_STATE, action: any) {
  switch (action.type) {
    case WonderActions.INITIALIZE_BEFORE_WONDERS:
      state.beforeWonders = action.payload;
      return state;
    case WonderActions.INITIALIZE_AFTER_WONDERS:
      state.afterWonders = action.payload;
      return state;
    case WonderActions.CHANGE_BEFORE_WONDERS:
      state.beforeWonders[action.payload.index].replace(action.payload.wonder);
      return state;
    case WonderActions.CHANGE_AFTER_WONDERS:
      state.afterWonders[action.payload.index].replace(action.payload.wonder);
      return state;
    default:
      return state;
  }
}
