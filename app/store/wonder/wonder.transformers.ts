import { IWonder, IWonderItem, WonderRecord } from './wonder.types';
import { List } from 'immutable';

export function deimmutifyWonder(state: IWonder): Object[] {
  return state.toJS();
}

export function reimmutifyWonder(plain): IWonder {
  return List<IWonderItem>(plain ? plain.map(WonderRecord) : []);
}
