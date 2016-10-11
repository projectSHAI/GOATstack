import { Component, OnInit } from '@angular/core';
import { Cookie }    from 'ng2-cookies/ng2-cookies';
import { Observable } from 'rxjs/Observable';

import { UserService }  from '../../services/user/user.service';
import { User } from '../../models/models.namespace';

@Component({
  moduleId: module.id,
  selector: 'signinout',
  providers: [UserService],
  template: `
    <div class='user-sign'>
      <h3 *ngIf='currentUser'>Welcome, {{currentUser.userName}}</h3>
      <button *ngIf='!currentUser' type='button' (click)='testRegisterUser()'>Sign up</button>
      <button *ngIf='!currentUser' type='button' (click)='testUser()'>Sign in</button>
      <button *ngIf='currentUser' type='button' (click)='logout()'>Sign out</button>
    </div>`,
  styles: [`
    .user-sign{
      position: absolute;
      top:0;
      right:0;
      margin: 23px 5%;
    }
    .user-sign button:hover{
      cursor: pointer;
    }`]

})
export class SignInOutComponent implements OnInit {
  currentUser: User;

  constructor(private userService: UserService) {  }

  ngOnInit() {
    if (Cookie.get('token'))
      this.userService.getMe().subscribe(user => this.currentUser = user);
  }

  login(email: string, password: string) {
    this.userService.login(email, password)
      .subscribe(user => this.currentUser = user);
  }

  logout() {
    this.userService.logout();
    this.currentUser = null;
  }

  registerUser(username: string, email: string, password: string) {
    this.userService.signup(username, email, password)
      .subscribe(user => this.currentUser = user);
  }

  testUser() {
    this.login('jc.thomas4214@gmail.com', 'flight1855');
  }

  testRegisterUser() {
    this.registerUser('Jays', 'jc.thomas42@gmail.com', 'flight1855');
  }
}
