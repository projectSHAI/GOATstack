import { combineReducers } from 'redux';
// import persistState from 'redux-localStorage';
import * as error from './errorHandler/index';
import * as userForm from './userForm/index';
import * as user from './user/index';
import * as cloud from './cloud/index';
import * as wonder from './wonder/index';
import * as timeOfDay from './time-of-day/index';
// DO NOT REMOVE: template store imports

// IAppState is the applications store where all persistant data
// should be stored
export class IAppState {
    error?: error.IError;
    user?: user.IUser;
    userForm?: userForm.IUserForm;
    wonder?: wonder.IWonder;
    cloudStyle?: cloud.ICloudStyle;
    animaArray?: cloud.IAnimaArray;
    timeOfDay?: timeOfDay.ITimeOfDay;
    // DO NOT REMOVE: template store attributes
};

// Each reducer is connected to a coresponding store attribute
// combineReducers() creates a root reducer while maintaining
// this one-2-one relationship
export const rootReducer = combineReducers<IAppState>({
    error: error.errorHandlerReducer,
    user: user.userReducer,
    userForm: userForm.userFormReducer,
    wonder: wonder.wonderReducer,
    cloudStyle: cloud.cloudReducer,
    animaArray: cloud.animaReducer,
    timeOfDay: timeOfDay.timeOfDayReducer,
    // DO NOT REMOVE: template reducers
});

// Redux plugins/enhancers go here
export const enhancers = [
  // persistState('GOAT-stack', { key: 'GOAT-stack' })
];
