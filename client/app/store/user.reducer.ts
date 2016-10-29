import { UserActions } from '../actions/user.actions';
import { User } from '../models/models.namespace';

const INITIAL_STATE: User = null;

export function userReducer(state: User = INITIAL_STATE, action: any) {
  switch (action.type) {
    case UserActions.LOGIN_USER:
    case UserActions.REGISTER_USER:
    case UserActions.LOGOUT_USER:
      return action.payload;
    default:
      return state;
  }
}
