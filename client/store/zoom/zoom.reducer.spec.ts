import { Map } from 'immutable';
import { zoomReducer } from './zoom.reducer';
import { INITIAL_STATE } from './zoom.initial-state';
import { ZoomActions } from '../../main-segment/actions/zoom/zoom.actions';

// Testing for the errorHandler reducer
describe('Zoom Reducer', () => {
  let initialState = INITIAL_STATE;

  // before each test we will reset the state
  beforeEach(() => {
    initialState = zoomReducer(undefined, { type: 'TEST_INIT' });
  });

  // First test is the state object in fact is immutable
  it('should have an immutable initial state', () => {
    expect(Map.isMap(initialState)).toBe(true);
  });

  it('should be true or false', () => {
    const previousState = initialState;
    const nextState     = zoomReducer(previousState, {
      type: ZoomActions.UPDATE_SHOW_HIDE
    });

    expect(previousState.getIn(['showHide'])).toBe(true);

    expect(nextState.getIn(['showHide'])).toBe(false);


  });

});
