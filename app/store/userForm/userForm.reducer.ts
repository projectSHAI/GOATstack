import { UserFormActions } from '../../actions/userForm/userForm.actions';
import { reimmutifyUserForm } from './userForm.transformers';
import { IUserForm } from './userForm.types';
import { INITIAL_STATE } from './userForm.initial-state';

// Define the reducer that will initiate state changes for userForm
export function userFormReducer(state: IUserForm = INITIAL_STATE, action: any) {
  // will decide what state change is necessary based off the type
  switch (action.type) {
    case UserFormActions.LOGIN_FORM_IN:
      return state
        .updateIn(['userSigning'], val => true)
        .updateIn(['userSignup'], val => false);
    case UserFormActions.REGISTER_FORM_IN:
      return state
        .updateIn(['userSigning'], val => false)
        .updateIn(['userSignup'], val => true);
    case UserFormActions.LOGIN_FORM_OUT:
    case UserFormActions.REGISTER_FORM_OUT:
      return state
        .updateIn(['userSignup'], val => false)
        .updateIn(['userSigning'], val => false);
    default:
      return state;
  }
}
