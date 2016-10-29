import { Injectable } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { UserService } from '../services/user/user.service';
import { UserFormActions } from '../actions/userForm.actions';
import { ErrorHandlerActions } from '../actions/errorHandler.actions';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class UserActions {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private userFormActions: UserFormActions,
    private errorHandler: ErrorHandlerActions,
    private userService: UserService) { }

  static LOGIN_USER: string = 'LOGIN_USER';
  static LOGOUT_USER: string = 'LOGOUT_USER';
  static REGISTER_USER: string = 'REGISTER_USER';

  getMe() {
    this.userService.getMe().subscribe(user => {
      this.ngRedux.dispatch({
        type: UserActions.LOGIN_USER,
        payload: user
      });
    });
  }

  login(lf: FormGroup) {
    if (lf.valid) {
      this.userService.login(lf.value.login_email, lf.value.login_password)
        .subscribe(user => {
          this.ngRedux.dispatch({
            type: UserActions.LOGIN_USER,
            payload: user
          });
        }, err => this.errorHandler.showError(err));
    }
  }

  logout() {
    Cookie.delete('token');
    this.ngRedux.dispatch({
      type: UserActions.LOGOUT_USER,
      payload: null
    });
  }

  register(rf: FormGroup) {
    if (rf.valid && (rf.value.signup_password === rf.value.signup_re_password)) {
      this.userService.signup(rf.value.signup_username, rf.value.signup_email, rf.value.signup_password)
        .subscribe(user => {
          this.ngRedux.dispatch({
            type: UserActions.REGISTER_USER,
            payload: user
          });
        }, err => this.errorHandler.showError(err));
    }
    else if (rf.value.signup_password !== rf.value.signup_re_password)
      this.errorHandler.showError('Inputted passwords are not the same!');
  }

}
