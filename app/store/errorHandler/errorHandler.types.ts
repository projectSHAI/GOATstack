import { Map } from 'immutable';

export interface IErrorItem {
  message: string;
}

export type IError = Map<IErrorItem, IErrorItem>;
