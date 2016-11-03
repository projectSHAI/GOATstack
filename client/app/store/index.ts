import { combineReducers } from 'redux';
// import persistState from 'redux-localStorage';
import * as error from './errorHandler';
import * as userForm from './userForm';
import * as user from './user';
import * as cloud from './cloud';
import * as wonder from './wonder';

export class IAppState {
  error?: error.IError;
  user?: user.IUser;
  userForm?: userForm.IUserForm;
  wonder?: wonder.IWonder;
  cloudStyle?: cloud.ICloudStyle;
  animaArray?: cloud.IAnimaArray;
};

export const rootReducer = combineReducers<IAppState>({
  error: error.errorHandlerReducer,
  user: user.userReducer,
  userForm: userForm.userFormReducer,
  wonder: wonder.wonderReducer,
  cloudStyle: cloud.cloudReducer,
  animaArray: cloud.animaReducer
});

export const enhancers = [
  // persistState('GOAT-stack', { key: 'GOAT-stack' })
];
