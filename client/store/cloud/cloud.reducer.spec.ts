import { List } from 'immutable';
import { cloudReducer, animaReducer } from './cloud.reducer';
import { STYLE_INITIAL_STATE, ANIMA_INITIAL_STATE } from './cloud.initial-state';
import { CloudActions } from '../../sky-segment/actions/cloud/cloud.actions';

describe('Cloud Reducer', () => {
  let cloudInitialState = STYLE_INITIAL_STATE;
  let animaInitialState = ANIMA_INITIAL_STATE;

  beforeEach(() => {
    cloudInitialState = cloudReducer(undefined, { type: 'TEST_INIT' });
    animaInitialState = animaReducer(undefined, { type: 'TEST_INIT' });
  });

  it('should have an immutable initial state', () => {
    expect(List.isList(cloudInitialState)).toBe(true);
    expect(List.isList(animaInitialState)).toBe(true);
  });

  it('should change states to a List of 10', () => {
    const previousStateStyle = cloudInitialState;
    const previousStateAnima = animaInitialState;
    let nextStateStyle = previousStateStyle;
    let nextStateAnima = previousStateAnima;
    for (let i = 0; i < 10; i++) {
      nextStateStyle = cloudReducer(nextStateStyle,
        { type: CloudActions.CHANGE_STYLES, payload: { asset: 'test' + i } });
      nextStateAnima = animaReducer(nextStateAnima,
        { type: CloudActions.CHANGE_ANIMA, payload: { timeline: 'test' + i } });
    }

    expect(previousStateStyle.size).toBe(0);
    expect(previousStateAnima.size).toBe(0);

    expect(nextStateStyle.size).toBe(10);
    expect(nextStateAnima.size).toBe(10);
  });

  it('should change List item at appropriate index', () => {
    const previousStateStyle = cloudInitialState;
    const previousStateAnima = animaInitialState;
    let nextStateStyle = previousStateStyle;
    let nextStateAnima = previousStateAnima;

    for (let i = 0; i < 10; i++) {
      nextStateStyle = cloudReducer(nextStateStyle,
        { type: CloudActions.CHANGE_STYLES, payload: { asset: 'test' + i } });
      nextStateAnima = animaReducer(nextStateAnima,
        { type: CloudActions.CHANGE_ANIMA, payload: { timeline: 'test' + i } });
    }

    const finalStateStyle = cloudReducer(nextStateStyle,
      { type: CloudActions.CHANGE_STYLES, payload: { index: 3, asset: 'TEST_ASSET_STYLE' } });
    const finalStateAnima = animaReducer(nextStateAnima,
      { type: CloudActions.CHANGE_ANIMA, payload: { index: 5, timeline: 'TEST_ASSET_ANIMA' } });

    expect(nextStateStyle.get(3)).toBe('test3');
    expect(nextStateAnima.get(5)).toBe('test5');

    expect(finalStateStyle.get(3)).toBe('TEST_ASSET_STYLE');
    expect(finalStateAnima.get(5)).toBe('TEST_ASSET_ANIMA');
  });
});
