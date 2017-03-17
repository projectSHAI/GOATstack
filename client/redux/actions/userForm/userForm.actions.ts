import { Injectable } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/index';

import { UserService } from '../../../modules/core/services/user/user.service';

/////////////////////////////////////////////////////////////////////////
/* UserForm Actions: used to call dispatches to change the userForm
                     object in the store
  
    LOGIN_FORM_IN       ->   Opens the login form (closes reg form)
    LOGIN_FORM_OUT      ->   Closes the Login form
    REGISTER_FORM_IN    ->   Opens the registration form (closes login form)
    REGISTER_FORM_OUT   ->   Closes the registration form
*/
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
