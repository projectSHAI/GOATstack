import { IWonder, IWonderItem, IWonderBaseItem, IInvalidateItem, WonderRecord } from './wonder.types';
import { List, Map } from 'immutable';

// functions to change the state of the data
// either immutable -> mutable or mutable -> immutable
export function deimmutifyWonder(state: IWonder): Object[] {
  return state.toJS();
}

export function reimmutifyWonder(plain): IWonder {
  if (plain.wonder) {
	plain.wonder = List<IWonderBaseItem>(plain ? plain.wonder.map(WonderRecord) : []);
  }
  if (plain.didInvalidate) {
  	plain.didInvalidate = Map<IInvalidateItem,IInvalidateItem>(plain.didInvalidate);
  }
  return Map<IWonderItem, IWonderItem>(plain ? plain : {});
}
