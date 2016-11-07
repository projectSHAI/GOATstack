import { Map } from 'immutable';
import { IUser, IUserItem } from './user.types';

// functions to change the state of the data
// either immutable -> mutable or mutable -> immutable
export function deimmutifyUser(state: IUser): Object {
  return state.toJS();
}

export function reimmutifyUser(plain): IUser {
  return Map<IUserItem, IUserItem>(plain ? plain : {});
}
