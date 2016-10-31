import { CloudActions } from '../actions/cloud.actions';

const INITIAL_STATE: any = {
  cloudStyle: [],
  animaArray: [],
};

export function cloudReducer(state: any = INITIAL_STATE, action: any) {
  switch (action.type) {
    case CloudActions.CHANGE_ANIMA:
      state.animaArray.push(action.payload);
      return state;
    case CloudActions.CHANGE_STYLES:
      try {
        state.cloudStyle[action.payload.index] = action.payload.asset;
      } catch(err) {
        state.cloudStyle.push(action.payload.asset);
      }
      return state;
    default:
      return state;
  }
}
