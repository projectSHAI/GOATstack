import { Map } from 'immutable';

export interface IUserItem {
  _id: string;
  created: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export type IUser = Map<IUserItem, IUserItem>;
