import { UserActions } from '../../actions/user/user.actions';
import { IUser } from './user.types';
import { reimmutifyUser,  } from './user.transformers';
import { INITIAL_STATE } from './user.initial-state';

// Define the reducer that will initiate state changes for user
export function userReducer(state: IUser = INITIAL_STATE, action: any) {
  // will determine proper state change based off the type
  switch (action.type) {
    case UserActions.INVALIDATE_USER:
      // Indead of return a new Map, have immutable manage
      // what happens to the old object by merging
      return state.mergeWith((prev, next) => next, reimmutifyUser({
        fetching: false,
        didInvalidate: action.payload
      }));
    case UserActions.FETCH_USER:
      return state
        .updateIn(['fetching'], val => true) 
        .deleteIn(['didInvalidate']);  
    case UserActions.LOGIN_USER:
    case UserActions.REGISTER_USER:
      // Indead of return a new Map, have immutable manage
      // what happens to the old object by merging
      return state.mergeWith((prev, next) => next, reimmutifyUser({
        fetching: false,
        userItem: action.payload
      }));
    case UserActions.LOGOUT_USER:
      return state.clear()
        .updateIn(['fetching'], val => false)
        .deleteIn(['userItem']); 
    default:
      return state;
  }
}
