import { ErrorHandlerActions } from '../actions/errorHandler.actions';

const INITIAL_STATE: string = '';

export function errorHandlerReducer(state: string = INITIAL_STATE, action: any) {
  switch(action.type) {
    case ErrorHandlerActions.SHOW_ERROR:
    case ErrorHandlerActions.HIDE_ERROR:
      return action.payload;
    default:
      return state;
  }
}
