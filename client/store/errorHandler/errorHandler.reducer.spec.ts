import { Map } from 'immutable';
import { errorHandlerReducer } from './errorHandler.reducer';
import { INITIAL_STATE } from './errorHandler.initial-state';
import { ErrorHandlerActions } from '../../actions/error/errorHandler.actions';

// Testing for the errorHandler reducer
describe('ErrorHandler Reducer', () => {
  let initialState = INITIAL_STATE;

  // before each test we will reset the state
  beforeEach(() => {
    initialState = errorHandlerReducer(undefined, { type: 'TEST_INIT' });
  });

  // First test is the state object in fact is immutable
  it('should have an immutable initial state', () => {
    expect(Map.isMap(initialState)).toBe(true);
  });

  // Test to see if the object does contain the message
  it('should set the error message on SHOW_ERROR', () => {
    const previousState = initialState;
    const nextState = errorHandlerReducer(initialState,
      { type: ErrorHandlerActions.SHOW_ERROR, payload: 'Testing Error Message' });

    expect(previousState.getIn(['message'])).toBe('');
    expect(nextState.getIn(['message'])).toBe('Testing Error Message');
  });

  // Test to see if the object does not contain the message  
  it('should remove error message on HIDE_ERROR', () => {
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
