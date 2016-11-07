import { List } from 'immutable';
import { ICloudStyle, IAnimaArray } from './cloud.types';

// functions to change the state of the data
// either immutable -> mutable or mutable -> immutable
export function deimmutifyCloudStyle(state: ICloudStyle): Object[] {
  return state.toJS();
}

export function reimmutifyCloudStyle(plain): ICloudStyle {
  return List<string>(plain ? plain : []);
}

export function deimmutifyAnimaArray(state: IAnimaArray): Object[] {
  return state.toJS();
}

export function reimmutifyAnimaArray(plain): IAnimaArray {
  return List<any>(plain ? plain : []);
}
