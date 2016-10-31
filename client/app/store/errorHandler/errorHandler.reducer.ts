import { ErrorHandlerActions } from '../../actions/errorHandler.actions';
import { reimmutifyError } from './errorHandler.transformers';
import { IError } from './errorHandler.types';

import { INITIAL_STATE } from './errorHandler.initial-state';

export function errorHandlerReducer(state: IError = INITIAL_STATE, action: any) {
  switch(action.type) {
    case ErrorHandlerActions.SHOW_ERROR:
    case ErrorHandlerActions.HIDE_ERROR:
      return reimmutifyError({ message: action.payload });
    default:
      return state;
  }
}
