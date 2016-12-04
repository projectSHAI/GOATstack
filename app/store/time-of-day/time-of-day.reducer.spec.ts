import { Map } from 'immutable';
import { timeOfDayReducer } from './time-of-day.reducer';
import { INITIAL_STATE } from './time-of-day.initial-state';
import { TimeOfDayActions } from '../../actions/time-of-day/time-of-day.actions';

// Testing for the timeOfDay reducer
describe('TimeOfDay Reducer', () => {
  let initialState = INITIAL_STATE;

  // before each test we will reset the state
  beforeEach(() => {
    initialState = timeOfDayReducer(undefined, { type: 'TEST_INIT' });
  });

  // First test is that the state object in fact is immutable
  it('should have an immutable initial state', () => {
    expect(Map.isMap(initialState)).toBe(true);
  });

  // Test to see if the object does contain the message
  it('should update assets in store to day assets on DAY_TIME', () => {
    const previousState = initialState;
    const nextState = timeOfDayReducer(
      initialState,
      { type: TimeOfDayActions.DAY_TIME }
      );

    expect(previousState).toBe(initialState);
    expect(nextState.getIn(['titleColor'])).toBe('black');
    expect(nextState.getIn(['nightTime'])).toBe('false');
    expect(nextState.getIn(['cloudBrightness'])).toBe('brightness(100%)');
    expect(nextState.getIn(['skyColor'])).toBe('linear-gradient(to bottom, #ffffff 0%,#6abfeb 100%)');
    expect(nextState.getIn(['mountainGoatSvg'])).toBe('assets/day-mountain-goat.svg');
    expect(nextState.getIn(['islandSvg'])).toBe('assets/day-island.svg');
    expect(nextState.getIn(['oceanOverlaySvg'])).toBe('assets/day-ocean-overlay.svg');
    expect(nextState.getIn(['whaleSvg'])).toBe('assets/day-whale.svg');
    expect(nextState.getIn(['sunMoonGlow'])).toBe('0px 0px 100px 12px yellow');
    expect(nextState.getIn(['sunMoonBorder'])).toBe('rgba(255,255,0, 0.3)');
  });

  // Test to see if the object does not contain the message  
  it('should update assets in store to night assets on NIGHT_TIME', () => {
    const previousState = initialState;
    const nextState = timeOfDayReducer(
      initialState,
      { type: TimeOfDayActions.NIGHT_TIME }
      );

    expect(previousState).toBe(initialState);
    expect(nextState.getIn(['titleColor'])).toBe('white');
    expect(nextState.getIn(['nightTime'])).toBe('true');
    expect(nextState.getIn(['cloudBrightness'])).toBe('brightness(30%)');
    expect(nextState.getIn(['skyColor'])).toBe('linear-gradient(to bottom, #000000 0%,#140f28 100%)');
    expect(nextState.getIn(['mountainGoatSvg'])).toBe('assets/night-mountain-goat.svg');
    expect(nextState.getIn(['islandSvg'])).toBe('assets/night-island.svg');
    expect(nextState.getIn(['oceanOverlaySvg'])).toBe('assets/night-ocean-overlay.svg');
    expect(nextState.getIn(['whaleSvg'])).toBe('assets/night-whale.svg');
    expect(nextState.getIn(['sunMoonGlow'])).toBe('0px 0px 100px 12px #7c4dff');
    expect(nextState.getIn(['sunMoonBorder'])).toBe('rgba(102,51,153, 0.3)');
  });
});