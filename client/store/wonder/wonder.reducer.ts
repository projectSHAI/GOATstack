import { WonderActions } from '../../main-segment/actions/wonder/wonder.actions';
import { IWonder } from './wonder.types';
import { reimmutifyWonder } from './wonder.transformers';
import { INITIAL_STATE } from './wonder.initial-state';

// Define the reducer that will initiate state change for the wonder object
export function wonderReducer(state: IWonder = INITIAL_STATE, action: any) {
  // will determine the proper state change based off the type
  switch (action.type) {
    case WonderActions.INVALIDATE_WONDER:
      // An invalidation can come from a get or a post
      return state.mergeWith((prev, next) => next, reimmutifyWonder({
        fetching: false,
        sending: false,
        didInvalidate: action.payload
      }));
    case WonderActions.FETCH_WONDERS:
      // When fetching wonders "sending" should already ne false
      // and "didInvalidate" should not exist until a problem happens
      return state
        .updateIn(['fetching'], val => true);
    case WonderActions.INITIALIZE_WONDERS:
      // When we initialialize wonders we're coming from the fetching
      // state so it must be changed to false
      return state.mergeWith((prev, next) => next, reimmutifyWonder({
        fetching: false,
        wonder: action.payload 
      }));
    case WonderActions.SEND_WONDER:
      // When we send a wonder change "sending" to true
      // this is also where we reset "didInvalidate" until it happens again
      return state
        .updateIn(['sending'], val => true)
        .deleteIn(['didInvalidate']);
    case WonderActions.CHANGE_WONDERS:
      // when we change a wonder the response has come from the server
      // make sure the new wonder gets assigned approapriatly and 
      // "sending" & "fetching" are false
      return state
        .updateIn(['fetching'], val => false)
        .updateIn(['sending'], val => false)
        .updateIn(['wonder', action.payload.index, '_id'], val => action.payload.object._id)
        .updateIn(['wonder', action.payload.index, 'created'], val => action.payload.object.created)
        .updateIn(['wonder', action.payload.index, 'name'], val => action.payload.object.name)
        .updateIn(['wonder', action.payload.index, 'xcoor'], val => action.payload.object.xcoor)
        .updateIn(['wonder', action.payload.index, 'ycoor'], val => action.payload.object.ycoor);
    default:
      return state;
  }
}
