import { List, Map } from 'immutable';
import { wonderReducer } from './wonder.reducer';
import { INITIAL_STATE } from './wonder.initial-state';
import { WonderActions } from '../../sky-segment/actions/wonder/wonder.actions';

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

function initWonders(prvState): Map<any,any> {
  const previousState = prvState;
  return wonderReducer(previousState,
      { type: WonderActions.INITIALIZE_WONDERS, payload: wonderList });
}

describe('Wonder Reducer', () => {
  let initialState = INITIAL_STATE;

  beforeEach(() => {
    initialState = wonderReducer(undefined, { type: 'TEST_INIT' });
  });

  it('should have an immutable initial state', () => {
    expect(Map.isMap(initialState)).toBe(true);
  });

  it('should set didInvalidate to an object with error information', () => {
    const previousState = initWonders(initialState);
    const nextState = wonderReducer(previousState,
      { type: WonderActions.INVALIDATE_WONDER, payload: {
        status: 400,
        statusText: 'Bad Request',
        url: 'test:7001',
        message: 'this is a test error message'
      }});    

    expect(previousState.getIn(['fetching'])).toBe(false);
    expect(previousState.getIn(['sending'])).toBe(false);  
    expect(previousState.hasIn(['didInvalidate'])).toBe(false);

    expect(nextState.getIn(['fetching'])).toBe(false);
    expect(nextState.getIn(['sending'])).toBe(false);  
    expect(nextState.getIn(['didInvalidate', 'status'])).toBe(400);
    expect(nextState.getIn(['didInvalidate', 'statusText'])).toBe('Bad Request');
    expect(nextState.getIn(['didInvalidate', 'url'])).toBe('test:7001');
    expect(nextState.getIn(['didInvalidate', 'message'])).toBe('this is a test error message');
    expect(nextState.getIn(['wonder'])).toBe(previousState.getIn(['wonder']));
  });

  it('should indicate fetching when fetching wonder', () => {
    const previousState = initWonders(initialState);
    const nextState = wonderReducer(previousState, { type: WonderActions.FETCH_WONDERS }); 

    expect(previousState.getIn(['fetching'])).toBe(false);
    expect(previousState.getIn(['sending'])).toBe(false);

    expect(nextState.getIn(['fetching'])).toBe(true);
    expect(nextState.getIn(['sending'])).toBe(false);    
    expect(nextState.getIn(['wonder'])).toBe(previousState.getIn(['wonder']));
  });

  it('should indicate sending when sending wonder', () => {
    const previousState = initWonders(initialState);
    const nextState = wonderReducer(previousState, { type: WonderActions.SEND_WONDER }); 

    expect(previousState.getIn(['fetching'])).toBe(false);
    expect(previousState.getIn(['sending'])).toBe(false);

    expect(nextState.getIn(['fetching'])).toBe(false);
    expect(nextState.getIn(['sending'])).toBe(true);    
    expect(nextState.getIn(['wonder'])).toBe(previousState.getIn(['wonder']));
  });

  it('should change states to a List of 10', () => {
    const previousState = initialState;
    const nextState = wonderReducer(previousState,
      { type: WonderActions.INITIALIZE_WONDERS, payload: wonderList });

    expect(previousState.getIn(['fetching'])).toBe(false);
    expect(previousState.getIn(['sending'])).toBe(false);

    expect(previousState.getIn(['wonder']).size).toBe(0);
    expect(previousState.getIn(['wonder']).size).toBe(0);

    expect(nextState.getIn(['wonder']).size).toBe(10);
    expect(nextState.getIn(['wonder']).size).toBe(10);
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

    expect(previousState.getIn(['wonder', 4, 'name'])).toBe('Express');

    expect(nextState.getIn(['wonder', 4, 'name'])).toBe('TEST WONDER');
  });
});
