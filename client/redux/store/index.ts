import { combineReducers } from 'redux';
// import persistState from 'redux-localStorage';
import * as error from './errorHandler/index';
// DO NOT REMOVE: template store imports

// IAppState is the applications store where all persistant data
// should be stored
export class IAppState {
    error?: error.IError;
    // DO NOT REMOVE: template store attributes
};

// Each reducer is connected to a coresponding store attribute
// combineReducers() creates a root reducer while maintaining
// this one-2-one relationship
export const rootReducer = combineReducers<IAppState>({
    error: error.errorHandlerReducer,
    // DO NOT REMOVE: template reducers
});

// Redux plugins/enhancers go here
export const enhancers = [
  // persistState('GOAT-stack', { key: 'GOAT-stack' })
];
