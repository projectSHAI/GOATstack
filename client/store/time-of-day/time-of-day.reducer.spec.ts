import { Map } from 'immutable';
import { timeOfDayReducer } from './time-of-day.reducer';
import { INITIAL_STATE } from './time-of-day.initial-state';
import { TimeOfDayActions } from '../../main-segment/actions/time-of-day/time-of-day.actions';

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
    expect(nextState.getIn(['theme'])).toBe('day-time');
    expect(nextState.getIn(['cloudBrightness'])).toBe('brightness(100%)');
    expect(nextState.getIn(['skyColor'])).toBe('rgb(157, 211, 250)');
    expect(nextState.getIn(['mountainGoatSvg'])).toBe('public/assets/day-mountain-goat.png');
    expect(nextState.getIn(['islandSvg'])).toBe('public/assets/day-island.png');
    expect(nextState.getIn(['whaleSvg'])).toBe('public/assets/day-whale.png');
    expect(nextState.getIn(['capSvg'])).toBe('public/assets/epipelagic-cap-overlay-day.svg');
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
    expect(nextState.getIn(['theme'])).toBe('night-time');
    expect(nextState.getIn(['cloudBrightness'])).toBe('brightness(30%)');
    expect(nextState.getIn(['skyColor'])).toBe('rgb(15, 12, 30)');
    expect(nextState.getIn(['mountainGoatSvg'])).toBe('public/assets/night-mountain-goat.png');
    expect(nextState.getIn(['islandSvg'])).toBe('public/assets/night-island.png');
    expect(nextState.getIn(['whaleSvg'])).toBe('public/assets/night-whale.png');
    expect(nextState.getIn(['capSvg'])).toBe('public/assets/epipelagic-cap-overlay-night.svg');
    expect(nextState.getIn(['sunMoonGlow'])).toBe('0px 0px 100px 12px #7c4dff');
    expect(nextState.getIn(['sunMoonBorder'])).toBe('rgba(102,51,153, 0.3)');
  });
});