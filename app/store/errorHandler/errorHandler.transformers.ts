import { Map, Record } from 'immutable';
import { IError, IErrorItem } from './errorHandler.types';

export function deimmutifyError(state: IError): Object {
  return state.toJS();
}

export function reimmutifyError(plain): IError {
  return Map<IErrorItem, IErrorItem>(plain ? plain : '');
}
