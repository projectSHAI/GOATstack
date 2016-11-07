import { Map } from 'immutable';

// Interface describing the attributes
// the corresponding reducer will need
// to manipulate (immutably)
export interface IErrorItem {
  message: string;
}

// Export type so reducer will understand
export type IError = Map<IErrorItem, IErrorItem>;
