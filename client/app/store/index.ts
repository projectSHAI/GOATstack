import { combineReducers } from 'redux';
// const persistState = require('redux-localstorage');
import { errorHandlerReducer } from './errorHandler.reducer';
import { userReducer } from './user.reducer';
import { userFormReducer } from './userForm.reducer';

// Models
import { User } from '../models/models.namespace';

export class IAppState {
  error?: string;
  user?: User;
  userForm?: {
    userSigning: boolean,
    userSignup: boolean
  };
};

export const rootReducer = combineReducers<IAppState>({
  error: errorHandlerReducer,
  user: userReducer,
  userForm: userFormReducer
});

export const enhancers = [
  // persistState('GOAT-stack', { key: 'GOAT-stack' })
];
