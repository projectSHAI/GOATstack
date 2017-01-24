import { Map, Record } from 'immutable';
import { IError, IErrorItem } from './errorHandler.types';

// functions to change the state of the data
// either immutable -> mutable or mutable -> immutable
export function deimmutifyError(state: IError): Object {
  return state.toJS();
}

export function reimmutifyError(plain): IError {
  return Map<IErrorItem, IErrorItem>(plain ? plain : '');
}
