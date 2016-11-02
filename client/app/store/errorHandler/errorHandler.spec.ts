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
});
