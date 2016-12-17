import { Map } from 'immutable';

// Define an interface of the object that will be saved
export interface IUserFormItem {
  userSigning: boolean;
  userSignup: boolean;
}

// Export the type so the reducer and store will understand
export type IUserForm = Map<IUserFormItem, IUserFormItem>;
