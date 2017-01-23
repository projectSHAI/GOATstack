import { Map } from 'immutable';
import { userFormReducer } from './userForm.reducer';
import { INITIAL_STATE } from './userForm.initial-state';
import { UserFormActions } from '../../actions/userForm/userForm.actions';

describe('UserForm Reducer', () => {
  let initialState = INITIAL_STATE;

  beforeEach(() => {
    initialState = userFormReducer(undefined, { type: 'TEST_INIT' });
  });

  it('should have an immutable initial state', () => {
    expect(Map.isMap(initialState)).toBe(true);
  });

  it('should set userSigning to true on LOGIN_FORM_IN', () => {
    const previousState = initialState;
    const nextState = userFormReducer(previousState,
      { type: UserFormActions.LOGIN_FORM_IN });

    expect(previousState.getIn(['userSigning'])).toBe(false);
    expect(previousState.getIn(['userSignup'])).toBe(false);

    expect(nextState.getIn(['userSigning'])).toBe(true);
    expect(nextState.getIn(['userSignup'])).toBe(false);
  });

  it('should set userSigning to false on LOGIN_FORM_OUT', () => {
    const previousState = userFormReducer(initialState,
      { type: UserFormActions.LOGIN_FORM_IN });
    const nextState = userFormReducer(previousState,
      { type: UserFormActions.LOGIN_FORM_OUT });

    expect(previousState.getIn(['userSigning'])).toBe(true);
    expect(previousState.getIn(['userSignup'])).toBe(false);

    expect(nextState.getIn(['userSigning'])).toBe(false);
    expect(nextState.getIn(['userSignup'])).toBe(false);
  });

  it('should set userSignup to true on REGISTER_FORM_IN', () => {
    const previousState = initialState;
    const nextState = userFormReducer(previousState,
      { type: UserFormActions.REGISTER_FORM_IN });

    expect(previousState.getIn(['userSigning'])).toBe(false);
    expect(previousState.getIn(['userSignup'])).toBe(false);

    expect(nextState.getIn(['userSigning'])).toBe(false);
    expect(nextState.getIn(['userSignup'])).toBe(true);
  });

  it('should set userSignup to false on REGISTER_FORM_OUT', () => {
    const previousState = userFormReducer(initialState,
      { type: UserFormActions.REGISTER_FORM_IN });
    const nextState = userFormReducer(previousState,
      { type: UserFormActions.REGISTER_FORM_OUT });

    expect(previousState.getIn(['userSigning'])).toBe(false);
    expect(previousState.getIn(['userSignup'])).toBe(true);

    expect(nextState.getIn(['userSigning'])).toBe(false);
    expect(nextState.getIn(['userSignup'])).toBe(false);
  });

  it('should set swap userSigning and userSignup on REGISTER_FORM_IN', () => {
    const previousState = userFormReducer(initialState,
      { type: UserFormActions.LOGIN_FORM_IN });
    const nextState = userFormReducer(previousState,
      { type: UserFormActions.REGISTER_FORM_IN });

    expect(previousState.getIn(['userSigning'])).toBe(true);
    expect(previousState.getIn(['userSignup'])).toBe(false);

    expect(nextState.getIn(['userSigning'])).toBe(false);
    expect(nextState.getIn(['userSignup'])).toBe(true);
  });

  it('should set swap userSignup and userSigning on LOGIN_FORM_IN', () => {
    const previousState = userFormReducer(initialState,
      { type: UserFormActions.REGISTER_FORM_IN });
    const nextState = userFormReducer(previousState,
      { type: UserFormActions.LOGIN_FORM_IN });

    expect(previousState.getIn(['userSigning'])).toBe(false);
    expect(previousState.getIn(['userSignup'])).toBe(true);

    expect(nextState.getIn(['userSigning'])).toBe(true);
    expect(nextState.getIn(['userSignup'])).toBe(false);
  });
});
