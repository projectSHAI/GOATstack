import { Map } from 'immutable';
import { IUserForm, IUserFormItem } from './userForm.types';

export function deimmutifyUserForm(state: IUserForm): Object {
  return state.toJS();
}

export function reimmutifyUserForm(plain): IUserForm {
  return Map<IUserFormItem, IUserFormItem>(plain ? plain : {});
}
