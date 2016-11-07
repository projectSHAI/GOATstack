import { WonderActions } from '../../actions/wonder/wonder.actions';
import { IWonder } from './wonder.types';
import { reimmutifyWonder } from './wonder.transformers';
import { INITIAL_STATE } from './wonder.initial-state';

// Define the reducer that will initiate state change for the wonder object
export function wonderReducer(state: IWonder = INITIAL_STATE, action: any) {
  // will determine the proper state change based off the type
  switch (action.type) {
    case WonderActions.INITIALIZE_WONDERS:
      return state.mergeWith((prev, next) => next, reimmutifyWonder(action.payload));
    case WonderActions.CHANGE_WONDERS:
      return state
        .updateIn([action.payload.index, '_id'], val => action.payload.object._id)
        .updateIn([action.payload.index, 'created'], val => action.payload.object.created)
        .updateIn([action.payload.index, 'name'], val => action.payload.object.name)
        .updateIn([action.payload.index, 'xcoor'], val => action.payload.object.xcoor)
        .updateIn([action.payload.index, 'ycoor'], val => action.payload.object.ycoor);
    default:
      return state;
  }
}
