import { List } from 'immutable';
import { wonderReducer } from './wonder.reducer';
import { INITIAL_STATE } from './wonder.initial-state';
import { WonderActions } from '../../actions/wonder/wonder.actions';

const wonderList = [{
  _id: '1',
  created: '1',
  name: 'SocketIO',
  xcoor: 20,
  ycoor: 25
}, {
    _id: '2',
    created: '2',
    name: 'MongoDB',
    xcoor: 20,
    ycoor: 35
  }, {
    _id: '3',
    created: '3',
    name: 'Angular 2',
    xcoor: 25,
    ycoor: 45
  }, {
    _id: '4',
    created: '4',
    name: 'Karma',
    xcoor: 40,
    ycoor: 18
  }, {
    _id: '5',
    created: '5',
    name: 'Express',
    xcoor: 60,
    ycoor: 65
  }, {
    _id: '6',
    created: '6',
    name: 'Jasmine',
    xcoor: 80,
    ycoor: 55
  }, {
    _id: '7',
    created: '7',
    name: 'OAuth',
    xcoor: 15,
    ycoor: 35
  }, {
    _id: '8',
    created: '8',
    name: 'Node',
    xcoor: 13,
    ycoor: 40
  }, {
    _id: '9',
    created: '9',
    name: 'Redux',
    xcoor: 15,
    ycoor: 35
  }, {
    _id: '10',
    created: '10',
    name: 'Protractor',
    xcoor: 50,
    ycoor: 15
  }];

describe('Wonder Reducer', () => {
  let initialState = INITIAL_STATE;

  beforeEach(() => {
    initialState = wonderReducer(undefined, { type: 'TEST_INIT' });
  });

  it('should have an immutable initial state', () => {
    expect(List.isList(initialState)).toBe(true);
  });

  it('should change states to a List of 10', () => {
    const previousState = initialState;
    const nextState = wonderReducer(previousState,
      { type: WonderActions.INITIALIZE_WONDERS, payload: wonderList });

    expect(previousState.size).toBe(0);
    expect(previousState.size).toBe(0);

    expect(nextState.size).toBe(10);
    expect(nextState.size).toBe(10);
  });

  it('should change wonder state List at appropriate index', () => {
    const wonder = {
      _id: '99',
      created: '99',
      name: 'TEST WONDER',
      xcoor: 99,
      ycoor: 99
    };

    const previousState = wonderReducer(initialState,
      { type: WonderActions.INITIALIZE_WONDERS, payload: wonderList });
    const nextState = wonderReducer(previousState,
      { type: WonderActions.CHANGE_WONDERS, payload: { index: 4, object: wonder } });

    expect(previousState.getIn([4, 'name'])).toBe('Express');

    expect(nextState.getIn([4, 'name'])).toBe('TEST WONDER');
  });
});
