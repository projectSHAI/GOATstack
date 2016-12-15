import { Map } from 'immutable';
import { IUserForm, IUserFormItem } from './userForm.types';

// functions to change the state of the data
// either immutable -> mutable or mutable -> immutable
export function deimmutifyUserForm(state: IUserForm): Object {
  return state.toJS();
}

export function reimmutifyUserForm(plain): IUserForm {
  return Map<IUserFormItem, IUserFormItem>(plain ? plain : {});
}
