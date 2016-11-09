import { Map } from 'immutable';
import { IUser, IUserBaseItem, IUserItem, IInvalidateItem } from './user.types';

// functions to change the state of the data
// either immutable -> mutable or mutable -> immutable
export function deimmutifyUser(state: IUser): Object {
  return state.toJS();
}

export function reimmutifyUser(plain): IUser {
	if (plain.userItem) {
		plain.userItem = Map<IUserItem, IUserItem>(plain.userItem);
	}
	if (plain.didInvalidate) {		
		plain.didInvalidate = Map<IInvalidateItem, IInvalidateItem>(plain.didInvalidate);
	}

  return Map<IUserBaseItem, IUserBaseItem>(plain ? plain : {});
}
