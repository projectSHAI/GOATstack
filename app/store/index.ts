import { combineReducers } from 'redux';
// import persistState from 'redux-localStorage';
import * as error from './errorHandler/index';
import * as userForm from './userForm/index';
import * as user from './user/index';
import * as cloud from './cloud/index';
import * as wonder from './wonder/index';

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
