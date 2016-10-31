import { Map } from 'immutable';

export interface IUserFormItem {
  userSigning: boolean;
  userSignup: boolean;
}

export type IUserForm = Map<IUserFormItem, IUserFormItem>;
