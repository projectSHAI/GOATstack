import { Injectable } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/index';

import { UserService } from '../../services/user/user.service';

/////////////////////////////////////////////////////////////////////////
// UserForm Actions: used to call dispatches to change the userForm
//                   object in the store
/////////////////////////////////////////////////////////////////////////
@Injectable()
export class UserFormActions {
  private userSigning: boolean = false;
  private userSignup: boolean = false;

  constructor(private ngRedux: NgRedux<IAppState>) { }

  static LOGIN_FORM_IN: string = 'LOGIN_FORM_IN';
  static LOGIN_FORM_OUT: string = 'LOGIN_FORM_OUT';
  static REGISTER_FORM_IN: string = 'REGISTER_FORM_IN';
  static REGISTER_FORM_OUT: string = 'REGISTER_FORM_OUT';

  loginForm(action: boolean) {
    if (action)
      this.ngRedux.dispatch({ type: UserFormActions.LOGIN_FORM_IN });
    else
      this.ngRedux.dispatch({ type: UserFormActions.LOGIN_FORM_OUT });
  }

  registerForm(action: boolean) {
    if (action)
      this.ngRedux.dispatch({ type: UserFormActions.REGISTER_FORM_IN });
    else
      this.ngRedux.dispatch({ type: UserFormActions.REGISTER_FORM_OUT });
  }
}
