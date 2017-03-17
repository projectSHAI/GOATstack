import { NgRedux } from '@angular-redux/store';
import { UserFormActions } from './userForm.actions';

class MockRedux extends NgRedux<any> {
  constructor() {
    super(null);
  }
  dispatch: () => {};
}

describe('UserForm Actions Creator', () => {
  let actions: UserFormActions;
  let mockRedux: NgRedux<any>;

  beforeEach(() => {
    mockRedux = new MockRedux();
    actions = new UserFormActions(mockRedux);
  });

  it('should dispatch LOGIN_FORM_IN action', () => {
    const expectedAction = {
      type: UserFormActions.LOGIN_FORM_IN
    };

    spyOn(mockRedux, 'dispatch');
    actions.loginForm(true);

    expect(mockRedux.dispatch).toHaveBeenCalled();
    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch LOGIN_FORM_OUT action', () => {
    const expectedAction = {
      type: UserFormActions.LOGIN_FORM_OUT
    };

    spyOn(mockRedux, 'dispatch');
    actions.loginForm(false);

    expect(mockRedux.dispatch).toHaveBeenCalled();
    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch REGISTER_FORM_IN action', () => {
    const expectedAction = {
      type: UserFormActions.REGISTER_FORM_IN
    };

    spyOn(mockRedux, 'dispatch');
    actions.registerForm(true);

    expect(mockRedux.dispatch).toHaveBeenCalled();
    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch REGISTER_FORM_OUT action', () => {
    const expectedAction = {
      type: UserFormActions.REGISTER_FORM_OUT
    };

    spyOn(mockRedux, 'dispatch');
    actions.registerForm(false);

    expect(mockRedux.dispatch).toHaveBeenCalled();
    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
