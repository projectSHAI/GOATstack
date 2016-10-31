import { UserFormActions } from '../../actions/userForm.actions';
import { reimmutifyUserForm } from './userForm.transformers';
import { IUserForm } from './userForm.types';
import { INITIAL_STATE } from './userform.initial-state';

export function userFormReducer(state: IUserForm = INITIAL_STATE, action: any) {
  switch (action.type) {
    case UserFormActions.LOGIN_FORM_IN:
    case UserFormActions.LOGIN_FORM_OUT:
    case UserFormActions.REGISTER_FORM_IN:
    case UserFormActions.REGISTER_FORM_OUT:
      return reimmutifyUserForm(action.payload);
    default:
      return state;
  }
}
