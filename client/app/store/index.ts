import { combineReducers } from 'redux';
// import persistState from 'redux-localStorage';
import { wonderReducer } from './wonder.reducer';
import * as error from './errorHandler';
import * as userForm from './userForm';
import * as user from './user';
import * as cloud from './cloud';

// Models
import { Wonder } from '../models/models.namespace';

export class IAppState {
  error?: error.IError;
  user?: user.IUser;
  userForm?: userForm.IUserForm;
  wonder?: {
    beforeWonders: Array<Wonder>,
    afterWonders: Array<Wonder>
  };
  cloudStyle?: cloud.ICloudStyle;
  animaArray?: cloud.IAnimaArray;
};

export const rootReducer = combineReducers<IAppState>({
  error: error.errorHandlerReducer,
  user: user.userReducer,
  userForm: userForm.userFormReducer,
  wonder: wonderReducer,
  cloudStyle: cloud.cloudReducer,
  animaArray: cloud.animaReducer
});

export const enhancers = [
  // persistState('GOAT-stack', { key: 'GOAT-stack' })
];
