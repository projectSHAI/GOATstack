import { Map } from 'immutable';
import { errorHandlerReducer } from './errorHandler.reducer';
import { INITIAL_STATE } from './errorHandler.initial-state';
import { ErrorHandlerActions } from '../../actions/errorHandler.actions';

describe('ErrorHandler Reducer', () => {
  let initialState = INITIAL_STATE;

  beforeEach(() => {
    initialState = errorHandlerReducer(undefined, { type: 'TEST_INIT' });
  });

  it('should have an immutable initial state', () => {
    expect(Map.isMap(initialState)).toBe(true);
  });

  it('should set the error message on SHOW_ERROR', () => {
    const previousValue = initialState.getIn(['message']);
    const nextState = errorHandlerReducer(initialState,
      { type: ErrorHandlerActions.SHOW_ERROR, payload: 'Testing Error Message' });
    expect(nextState.getIn(['message'])).toBe('Testing Error Message');
  });

  it('should set the error message on HIDE_ERROR', () => {
    // First SHOW_ERROR and check
    const nextState = errorHandlerReducer(initialState,
      { type: ErrorHandlerActions.SHOW_ERROR, payload: 'Testing Error Message' });
    expect(nextState.getIn(['message'])).toBe('Testing Error Message');
    // Then HIDE_ERROR and check
    const nextState2 = errorHandlerReducer(nextState,
      { type: ErrorHandlerActions.HIDE_ERROR });
    expect(nextState2.getIn(['message'])).toBe('');
  });
});
