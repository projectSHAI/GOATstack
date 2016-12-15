import { List, Record, Map } from 'immutable';

// Define an interface of the object that will be saved
export interface IWonderBaseItem {
  _id: string;
  created: string;
  name: string;
  xcoor: number;
  ycoor: number;
}
export interface IInvalidateItem {
  status: number;
  statusText: string;
  url: string;
  message: string;
}
export interface IWonderItem {
  fatching: boolean;
  sending: boolean;
  didInvalidate: Map<IInvalidateItem,IInvalidateItem>;
  wonder: List<IWonderBaseItem>;
}

// Export the type so the reducer and store will understand
export type IWonder = Map<IWonderItem, IWonderItem>;

// List object will need a template record to 
// map when converting a js array
export const WonderRecord = Record({
  _id: '',
  created: '',
  name: '',
  xcoor: 0,
  ycoor: 0
});
