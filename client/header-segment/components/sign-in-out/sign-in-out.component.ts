import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { select } from 'ng2-redux';

import { UserActions }  from '../../../main-segment/actions/user/user.actions';
import { UserFormActions } from '../../../main-segment/actions/userForm/userForm.actions';
import { ErrorHandlerActions } from '../../../main-segment/actions/error/errorHandler.actions';

@Component({
  selector: 'sign-in-out',
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
