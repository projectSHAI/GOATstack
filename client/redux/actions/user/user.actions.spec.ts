import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { NgRedux } from '@angular-redux/store';
import { MockNgRedux } from '@angular-redux/store/testing';
import { UserActions } from './user.actions';
import { AuthService } from '../../../modules/core/services/auth/auth.service';
import { ErrorHandlerActions } from '../error/errorHandler.actions';
import { Cookie } from 'ng2-cookies/ng2-cookies';

const testUser = {
  _id: '1234',
  created: 'today',
  userName: 'testUserName',
  firstName: 'testFirstName',
  lastName: 'testLastName',
  email: 'testEmail',
  role: 'testRole'
};

const error = {
  status: 400,
  statusText: 'Bad Request',
  url: 'test:7001',
  message: 'this is a test error message'
};

class MockAuthService extends AuthService {
  constructor() {
    super(null);
  }

  autoLogin(): Observable<any> {
    return Observable.of(testUser);
  }
  login(email: string, password: string): Observable<any> {
    return Observable.of(testUser);
  }
  signup(username: string, email: string, password: string): Observable<any> {
    return Observable.of(testUser);
  }
  logout() { }
}

describe('User Actions Creator', () => {
  let actions: UserActions;
  let authService: AuthService;
  let errorActions: ErrorHandlerActions;
  let mockRedux: NgRedux<any>;

  beforeEach(() => {
    Cookie.delete('token');

    authService = new MockAuthService();
    mockRedux = MockNgRedux.getInstance();
    errorActions = new ErrorHandlerActions(mockRedux);
    actions = new UserActions(mockRedux, errorActions, authService);
  });

  it('should dispatch LOGIN_USER action when autoLogin() called', () => {
    Cookie.set('token', 'testCookie');

    const expectedActionPre = {
      type: UserActions.FETCH_USER
    };
    const expectedAction = {
      type: UserActions.LOGIN_USER,
      payload: testUser
    };

    spyOn(mockRedux, 'dispatch');
    actions.getMe();

    expect(mockRedux.dispatch).toHaveBeenCalled();
    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedActionPre);
    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch LOGIN_USER action', () => {
    const expectedActionPre = {
      type: UserActions.FETCH_USER
    };
    const expectedAction = {
      type: UserActions.LOGIN_USER,
      payload: testUser
    };

    const form = new FormGroup({
      login_email: new FormControl("test"),
      login_password: new FormControl("test")
    });

    spyOn(mockRedux, 'dispatch');
    actions.login(form);

    expect(mockRedux.dispatch).toHaveBeenCalled();
    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedActionPre);
    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch REGISTER_USER action', () => {    
    const expectedActionPre = {
      type: UserActions.FETCH_USER
    };
    const expectedAction = {
      type: UserActions.REGISTER_USER,
      payload: testUser
    };

    const form = new FormGroup({
      signup_username: new FormControl("testUserName"),
      signup_email: new FormControl("testEmail"),
      signup_password: new FormControl("test"),
      signup_re_password: new FormControl("test")
    });

    spyOn(mockRedux, 'dispatch');
    actions.register(form);

    expect(mockRedux.dispatch).toHaveBeenCalled();
    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedActionPre);
    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch LOGOUT_USER action', () => {
    const expectedAction = { type: UserActions.LOGOUT_USER };

    spyOn(mockRedux, 'dispatch');
    actions.logout();

    expect(mockRedux.dispatch).toHaveBeenCalled();
    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
