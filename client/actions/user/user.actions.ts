import { Injectable } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/index';

import { UserService } from '../../core/services/user/user.service';
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

  static FETCH_USER: string = 'FETCH_USER';
  static INVALIDATE_USER: string = 'INVALIDATE_USER';
  static LOGIN_USER: string = 'LOGIN_USER';
  static LOGOUT_USER: string = 'LOGOUT_USER';
  static REGISTER_USER: string = 'REGISTER_USER';

  invalidateUser(error: Object): void { 
    this.ngRedux.dispatch({  // if an error happens change state to reflect
        type: UserActions.INVALIDATE_USER,
        payload: error // pass in the json object made in userService.handleError
      });
  }

  fetchUser(): void {
    this.ngRedux.dispatch({ type: UserActions.FETCH_USER });
  }

  getMe(): void {
    // We will only execute if there's a token present
    if (Cookie.get('token')) {
      // First change the state to fetching
      this.fetchUser();
      // subscribe to the service and wait for a response
      this.userService.getMe().subscribe(user => {
        // once a response comes change the state to reflect user info
        this.ngRedux.dispatch({
          type: UserActions.LOGIN_USER,
          payload: user
        });
      }, err => this.invalidateUser(err));
    }
  }

  // Setting lf to type FormGroup causes issues
  login(lf: any): void {
    // only if the login form is filled
    if (lf.valid) {
      // First change the state to fetching
      this.fetchUser();
      // subscribe to the service and wait for a response
      this.userService.login(lf.value.login_email, lf.value.login_password)
        .subscribe(user => {
          // once a response comes change the state to reflect user info
          this.ngRedux.dispatch({
            type: UserActions.LOGIN_USER,
            payload: user
          });
        }, err => {
          this.invalidateUser(err);
          this.errorHandler.showError(err.message);
        });
    }
  }

  logout(): void {
    // simply delete the cached token
    Cookie.delete('token');
    // and delete the user object in the state
    this.ngRedux.dispatch({ type: UserActions.LOGOUT_USER });
  }

  // Setting lf to type FormGroup causes issues
  register(rf: any): void {
    // only if the form is filled and passwords equal the same
    if (rf.valid && (rf.value.signup_password === rf.value.signup_re_password)) {
      // First change the state to fetching
      this.fetchUser();
      // subscribe to the service and wait for a response
      this.userService.signup(rf.value.signup_username, rf.value.signup_email, rf.value.signup_password)
        .subscribe(user => {
          // once a response comes change the state to reflect user info
          this.ngRedux.dispatch({
            type: UserActions.REGISTER_USER,
            payload: user
          });
        }, err => { 
          this.invalidateUser(err);
          this.errorHandler.showError(err.message);
        });
    }
    else if (rf.value.signup_password !== rf.value.signup_re_password)
      // if the passwords are not the same, simply display the message 
      this.errorHandler.showError('Inputted passwords are not the same!');
  }

}
