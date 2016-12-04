import { combineReducers } from 'redux';
// import persistState from 'redux-localStorage';
import * as error from './errorHandler/index';
import * as userForm from './userForm/index';
import * as user from './user/index';

// IAppState is the applications store where all persistant data
// should be stored
export class IAppState {
  error?: error.IError;
  user?: user.IUser;
  userForm?: userForm.IUserForm;
};

// Each reducer is connected to a coresponding store attribute
// combineReducers() creates a root reducer while maintaining
// this one-2-one relationship
export const rootReducer = combineReducers<IAppState>({
  error: error.errorHandlerReducer,
  user: user.userReducer,
  userForm: userForm.userFormReducer
});

// Redux plugins/enhancers go here
export const enhancers = [
  // persistState('GOAT-stack', { key: 'GOAT-stack' })
];
