import { List, Record } from 'immutable';

// Define an interface of the object that will be saved
export interface IWonderItem {
  _id: string;
  created: string;
  name: string;
  xcoor: number;
  ycoor: number;
}

// Export the type so the reducer and store will understand
export type IWonder = List<IWonderItem>;

// List object will need a template record to 
// map when converting a js array
export const WonderRecord = Record({
  _id: '',
  created: '',
  name: '',
  xcoor: 0,
  ycoor: 0
});
