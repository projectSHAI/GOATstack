import { combineReducers } from 'redux';
// import persistState from 'redux-localStorage';
import { userReducer } from './user.reducer';
import { wonderReducer } from './wonder.reducer';
import { cloudReducer } from './cloud.reducer';

import * as error from './errorHandler';
import * as userForm from './userForm';
// Models
import { User, Wonder } from '../models/models.namespace';

export class IAppState {
  error?: error.IError;
  user?: User;
  userForm?: userForm.IUserForm;
  wonder?: {
    beforeWonders: Array<Wonder>,
    afterWonders: Array<Wonder>
  };
  cloud?: {
    cloudStyle: Array<string>,
    animaArray: Array<any>
  };
};

export const rootReducer = combineReducers<IAppState>({
  error: error.errorHandlerReducer,
  user: userReducer,
  userForm: userForm.userFormReducer,
  wonder: wonderReducer,
  cloud: cloudReducer
});

export const enhancers = [
  // persistState('GOAT-stack', { key: 'GOAT-stack' })
];
