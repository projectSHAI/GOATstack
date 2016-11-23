import { Map } from 'immutable';
import { skyPositionReducer } from './sky-position.reducer';
import { INITIAL_STATE } from './sky-position.initial-state';
import { SkyPositionActions } from '../../actions/sky-position/sky-position.actions';

// Testing for the errorHandler reducer
describe('Sky Position Reducer', () => {
  let initialState = INITIAL_STATE;

  // before each test we will reset the state
  beforeEach(() => {
    initialState = skyPositionReducer(undefined, { type: 'TEST_INIT' });
  });

  // First test is the state object in fact is immutable
  it('should have an immutable initial state', () => {
    expect(Map.isMap(initialState)).toBe(true);
  });

  it('should be true or false', () => {
    const previousState = initialState;
    const nextState     = skyPositionReducer(previousState, {
      type: SkyPositionActions.UPDATE_SKY_POSITION
    });

    expect(previousState.getIn(['toSkyIsland'])).toBe(false);

    expect(nextState.getIn(['toSkyIsland'])).toBe(true);


  });

});
