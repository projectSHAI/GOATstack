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
export interface IInvalidateItem {
	status: number;
	statusText: string;
	url: string;
	message: string;
}
export interface IUserBaseItem {
	fetching: boolean;
	didInvalidate: Map<IInvalidateItem, IInvalidateItem>;
	userItem: Map<IUserItem, IUserItem>;
}

// Export the type so the reducer and store will understand
export type IUser = Map<IUserBaseItem, IUserBaseItem>;
