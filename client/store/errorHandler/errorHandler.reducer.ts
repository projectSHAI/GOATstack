import { ErrorHandlerActions } from '../../actions/error/errorHandler.actions';
import { reimmutifyError } from './errorHandler.transformers';
import { IError } from './errorHandler.types';

import { INITIAL_STATE } from './errorHandler.initial-state';

// define the reducer for error attribute in store 
export function errorHandlerReducer(state: IError = INITIAL_STATE, action: any) {
  // Depending on the incoming state 'type' execute corresponding state change
  switch(action.type) {
    case ErrorHandlerActions.SHOW_ERROR:
      return state.updateIn(['message'], val => action.payload);
    case ErrorHandlerActions.HIDE_ERROR:
      return state.updateIn(['message'], val => '');
    default:
      return state;
  }
}
