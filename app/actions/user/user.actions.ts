import { Injectable } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/index';

import { UserService } from '../../services/user/user.service';
import { ErrorHandlerActions } from '../error/errorHandler.actions';
import { Cookie } from 'ng2-cookies/ng2-cookies';

//////////////////////////////////////////////////////////////////////
/* User Actions: used to call dispatches to change the user object 
               in the store

    LOGIN_USER    ->    updates the user object with user information
    LOGOUT_USER   ->    clears the user object from the store
    REGISTER_USER ->    updates the user object with user information
*/
//////////////////////////////////////////////////////////////////////
@Injectable()
export class UserActions {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private errorHandler: ErrorHandlerActions,
    private userService: UserService) { }

  static LOGIN_USER: string = 'LOGIN_USER';
  static LOGOUT_USER: string = 'LOGOUT_USER';
  static REGISTER_USER: string = 'REGISTER_USER';

  getMe() {
    if (Cookie.get('token'))
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
    this.ngRedux.dispatch({ type: UserActions.LOGOUT_USER });
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
