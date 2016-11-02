import { WonderActions } from '../../actions/wonder/wonder.actions';
import { IWonder } from './wonder.types';
import { reimmutifyWonder } from './wonder.transformers';
import { INITIAL_STATE } from './wonder.initial-state';

export function beforeWonderReducer(state: IWonder = INITIAL_STATE, action: any) {
  switch (action.type) {
    case WonderActions.INITIALIZE_BEFORE_WONDERS:
      return reimmutifyWonder(action.payload);
    case WonderActions.CHANGE_BEFORE_WONDERS:
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

export function afterWonderReducer(state: IWonder = INITIAL_STATE, action: any) {
  switch (action.type) {
    case WonderActions.INITIALIZE_AFTER_WONDERS:
      return reimmutifyWonder(action.payload);
    case WonderActions.CHANGE_AFTER_WONDERS:
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
