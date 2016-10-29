import { UserFormActions } from '../actions/userForm.actions';

const INITIAL_STATE: any = {
  userSigning: false,
  userSignup: false
};

export function userFormReducer(state: any = INITIAL_STATE, action: any) {
  switch (action.type) {
    case UserFormActions.LOGIN_FORM_IN:
    case UserFormActions.LOGIN_FORM_OUT:
    case UserFormActions.REGISTER_FORM_IN:
    case UserFormActions.REGISTER_FORM_OUT:
      return action.payload;
    default:
      return state;
  }
}
