import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { select } from 'ng2-redux';

import { UserActions }  from '../../actions/user/user.actions';
import { UserFormActions } from '../../actions/userForm/userForm.actions';
import { ErrorHandlerActions } from '../../../main-segment/actions/error/errorHandler.actions';

@Component({
  moduleId: module.id,
  selector: 'sign-in-out',
  providers: [UserActions, UserFormActions],
  templateUrl: './sign-in-out.component.html',
  styleUrls: ['./sign-in-out.component.css']
})
export class SignInOutComponent implements OnInit {
  @select('user') user$: Observable<any>;
  @select('userForm') userForm$: Observable<any>;

  constructor(
    private userActions: UserActions,
    private userFormActions: UserFormActions,
    private errorHandler: ErrorHandlerActions) { }

  ngOnInit() {
    this.userActions.getMe();
  }
}
