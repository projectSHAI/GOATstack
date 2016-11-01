import { Map } from 'immutable';
import { IUser, IUserItem } from './user.types';

export function deimmutifyUser(state: IUser): Object {
  return state.toJS();
}

export function reimmutifyUser(plain): IUser {
  return Map<IUserItem, IUserItem>(plain ? plain : {});
}
