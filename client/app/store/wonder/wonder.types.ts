import { List, Record } from 'immutable';

export interface IWonderItem {
  _id: string;
  created: string;
  name: string;
  xcoor: number;
  ycoor: number;
}

export type IWonder = List<IWonderItem>;

export const WonderRecord = Record({
  _id: '',
  created: '',
  name: '',
  xcoor: 0,
  ycoor: 0
});
