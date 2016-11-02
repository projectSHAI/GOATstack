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

  it('should set user to user Object on LOGIN_USER', () => {
    const previousState = initialState;
    const nextState = userReducer(previousState,
      { type: UserActions.LOGIN_USER, payload: testUser });

    expect(previousState.isEmpty()).toBe(true);

    expect(nextState.getIn(['_id'])).toBe('1234');
    expect(nextState.getIn(['created'])).toBe('today');
    expect(nextState.getIn(['userName'])).toBe('testUserName');
    expect(nextState.getIn(['firstName'])).toBe('testFirstName');
    expect(nextState.getIn(['lastName'])).toBe('testLastName');
    expect(nextState.getIn(['email'])).toBe('testEmail');
    expect(nextState.getIn(['role'])).toBe('testRole');
  });

  it('should set user to user Object on REGISTER_USER', () => {
    const previousState = initialState;
    const nextState = userReducer(previousState,
      { type: UserActions.REGISTER_USER, payload: testUser });

    expect(previousState.isEmpty()).toBe(true);

    expect(nextState.getIn(['_id'])).toBe('1234');
    expect(nextState.getIn(['created'])).toBe('today');
    expect(nextState.getIn(['userName'])).toBe('testUserName');
    expect(nextState.getIn(['firstName'])).toBe('testFirstName');
    expect(nextState.getIn(['lastName'])).toBe('testLastName');
    expect(nextState.getIn(['email'])).toBe('testEmail');
    expect(nextState.getIn(['role'])).toBe('testRole');
  });

  it('should set user to empty Map on LOGOUT_USER', () => {
    const previousState = userReducer(initialState,
      { type: UserActions.LOGIN_USER, payload: testUser });
    const nextState = userReducer(previousState,
      { type: UserActions.LOGOUT_USER });

    expect(previousState.getIn(['_id'])).toBe('1234');
    expect(previousState.getIn(['created'])).toBe('today');
    expect(previousState.getIn(['userName'])).toBe('testUserName');
    expect(previousState.getIn(['firstName'])).toBe('testFirstName');
    expect(previousState.getIn(['lastName'])).toBe('testLastName');
    expect(previousState.getIn(['email'])).toBe('testEmail');
    expect(previousState.getIn(['role'])).toBe('testRole');

    expect(nextState.isEmpty()).toBe(true);
  });
});
