import { Map } from 'immutable';

// Define an interface of the object that will be saved
export interface IUserItem {
  _id: string;
  created: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

// Export the type so the reducer and store will understand
export type IUser = Map<IUserItem, IUserItem>;
