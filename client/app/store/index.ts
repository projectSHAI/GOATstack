import { combineReducers } from 'redux';
// import persistState from 'redux-localStorage';
import { errorHandlerReducer } from './errorHandler.reducer';
import { userReducer } from './user.reducer';
import { userFormReducer } from './userForm.reducer';
import { wonderReducer } from './wonder.reducer';
import { cloudReducer } from './cloud.reducer';

// Models
import { User, Wonder } from '../models/models.namespace';

export class IAppState {
  error?: string;
  user?: User;
  userForm?: {
    userSigning: boolean,
    userSignup: boolean
  };
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
  error: errorHandlerReducer,
  user: userReducer,
  userForm: userFormReducer,
  wonder: wonderReducer,
  cloud: cloudReducer
});

export const enhancers = [
  // persistState('GOAT-stack', { key: 'GOAT-stack' })
];
