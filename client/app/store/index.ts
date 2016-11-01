import { combineReducers } from 'redux';
// import persistState from 'redux-localStorage';
// import { wonderReducer } from './wonder.reducer';
import * as error from './errorHandler';
import * as userForm from './userForm';
import * as user from './user';
import * as cloud from './cloud';
import * as wonder from './wonder';

// Models
import { Wonder } from '../models/models.namespace';

export class IAppState {
  error?: error.IError;
  user?: user.IUser;
  userForm?: userForm.IUserForm;
  beforeWonder?: wonder.IWonder;
  afterWonder?: wonder.IWonder;
  cloudStyle?: cloud.ICloudStyle;
  animaArray?: cloud.IAnimaArray;
};

export const rootReducer = combineReducers<IAppState>({
  error: error.errorHandlerReducer,
  user: user.userReducer,
  userForm: userForm.userFormReducer,
  beforeWonder: wonder.beforeWonderReducer,
  afterWonder: wonder.afterWonderReducer,
  cloudStyle: cloud.cloudReducer,
  animaArray: cloud.animaReducer
});

export const enhancers = [
  // persistState('GOAT-stack', { key: 'GOAT-stack' })
];
