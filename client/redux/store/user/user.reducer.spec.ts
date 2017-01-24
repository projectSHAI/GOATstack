import { Map } from 'immutable';
import { userReducer } from './user.reducer';
import { INITIAL_STATE } from './user.initial-state';
import { UserActions } from '../../actions/user/user.actions';

const testUser = {
  _id: '1234',
  created: 'today',
  userName: 'testUserName',
  firstName: 'testFirstName',
  lastName: 'testLastName',
  email: 'testEmail',
  role: 'testRole'
};

describe('User Reducer', () => {
  let initialState = INITIAL_STATE;

  beforeEach(() => {
    initialState = userReducer(undefined, { type: 'TEST_INIT' });
  });

  it('should have an immutable initial state', () => {
    expect(Map.isMap(initialState)).toBe(true);
  });

  it('should indicate didInvalidate when INVALIDATE_USER state change', () => {
    const previousState = initialState;
    const nextState = userReducer(previousState,
      { type: UserActions.INVALIDATE_USER, payload: {
        status: 400,
        statusText: 'Bad Request',
        url: 'test:7001',
        message: 'this is a error message test'
      }});

    expect(previousState.getIn(['fetching'])).toBe(false);
    expect(previousState.hasIn(['didInvalidate'])).toBe(false);
    expect(previousState.hasIn(['userItem'])).toBe(false);

    expect(nextState.getIn(['fetching'])).toBe(false);
    expect(nextState.hasIn(['userItem'])).toBe(false);
    expect(nextState.getIn(['didInvalidate', 'status'])).toBe(400);
    expect(nextState.getIn(['didInvalidate', 'statusText'])).toBe('Bad Request');
    expect(nextState.getIn(['didInvalidate', 'url'])).toBe('test:7001');
    expect(nextState.getIn(['didInvalidate', 'message'])).toBe('this is a error message test');
  });

  it('should indicated fetching when FETCH_USER state change', () => {
    const previousState = initialState;
    const nextState = userReducer(previousState, { type: UserActions.FETCH_USER });

    expect(previousState.getIn(['fetching'])).toBe(false);
    expect(previousState.hasIn(['didInvalidate'])).toBe(false);
    expect(previousState.hasIn(['userItem'])).toBe(false);

    expect(nextState.getIn(['fetching'])).toBe(true);
    expect(previousState.hasIn(['didInvalidate'])).toBe(false);
    expect(previousState.hasIn(['userItem'])).toBe(false);

  });

  it('should set user to user Object on LOGIN_USER', () => {
    const previousState = initialState;
    const nextState = userReducer(previousState,
      { type: UserActions.LOGIN_USER, payload: testUser });

    expect(previousState.hasIn(['userItem'])).toBe(false);

    expect(nextState.getIn(['userItem', '_id'])).toBe('1234');
    expect(nextState.getIn(['userItem', 'created'])).toBe('today');
    expect(nextState.getIn(['userItem', 'userName'])).toBe('testUserName');
    expect(nextState.getIn(['userItem', 'firstName'])).toBe('testFirstName');
    expect(nextState.getIn(['userItem', 'lastName'])).toBe('testLastName');
    expect(nextState.getIn(['userItem', 'email'])).toBe('testEmail');
    expect(nextState.getIn(['userItem', 'role'])).toBe('testRole');
  });

  it('should set user to user Object on REGISTER_USER', () => {
    const previousState = initialState;
    const nextState = userReducer(previousState,
      { type: UserActions.REGISTER_USER, payload: testUser });

    expect(previousState.hasIn(['userItem'])).toBe(false);

    expect(nextState.getIn(['userItem', '_id'])).toBe('1234');
    expect(nextState.getIn(['userItem', 'created'])).toBe('today');
    expect(nextState.getIn(['userItem', 'userName'])).toBe('testUserName');
    expect(nextState.getIn(['userItem', 'firstName'])).toBe('testFirstName');
    expect(nextState.getIn(['userItem', 'lastName'])).toBe('testLastName');
    expect(nextState.getIn(['userItem', 'email'])).toBe('testEmail');
    expect(nextState.getIn(['userItem', 'role'])).toBe('testRole');
  });

  it('should set user to empty Map on LOGOUT_USER', () => {
    const previousState = userReducer(initialState,
      { type: UserActions.LOGIN_USER, payload: testUser });
    const nextState = userReducer(previousState,
      { type: UserActions.LOGOUT_USER });

    expect(previousState.getIn(['userItem', '_id'])).toBe('1234');
    expect(previousState.getIn(['userItem', 'created'])).toBe('today');
    expect(previousState.getIn(['userItem', 'userName'])).toBe('testUserName');
    expect(previousState.getIn(['userItem', 'firstName'])).toBe('testFirstName');
    expect(previousState.getIn(['userItem', 'lastName'])).toBe('testLastName');
    expect(previousState.getIn(['userItem', 'email'])).toBe('testEmail');
    expect(previousState.getIn(['userItem', 'role'])).toBe('testRole');

    expect(nextState.hasIn(['userItem'])).toBe(false);
  });
});
