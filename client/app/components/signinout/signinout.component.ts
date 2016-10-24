import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cookie }    from 'ng2-cookies/ng2-cookies';
import { Observable } from 'rxjs/Observable';

import { UserService }  from '../../services/user/user.service';
import { ErrorHandlerService } from '../../services/errorHandler/errorHandler.service';
import { User } from '../../models/models.namespace';

@Component({
  // moduleId: module.id,
  selector: 'signinout',
  providers: [UserService],
  template: `
    <div class="user-sign">
      <div>
        <h3 *ngIf="currentUser">Welcome, {{currentUser.userName}}</h3>
        <button md-raised-button *ngIf="!currentUser && !userSignup && !userSigning"
          type="button" (click)="registerUser()" color="primary">SIGN UP</button>
        <button md-raised-button *ngIf="!currentUser && !userSigning && !userSignup"
          type="button" (click)="login(loginForm)" color="primary">SIGN IN</button>
        <button md-raised-button *ngIf="currentUser" type="button"
          (click)="logout()" color="primary">SIGN OUT</button>
      </div>
      <md-card class="reg-card" *ngIf="userSigning">
        <md-toolbar color="primary">Sign In</md-toolbar>
        <md-card-content class="reg-content">
          <form #loginForm="ngForm" (ngSubmit)="login(loginForm)">
            <table style="width: 100%" cellspacing="0"><tr>
              <td><md-input name="login_email" ngModel required placeholder="Email"
                style="width: 100%" class="user-signin-input"></md-input></td>
              <td><md-input type="password" name="login_password" ngModel required
                style="width: 100%" placeholder="Password" class="user-signin-input"></md-input></td>
            </tr><tr>
              <td><button md-raised-button type="button" (click)="backButton()"
                color="primary" class="form-button">BACK</button>
              <button md-raised-button type="button" (click)="registerUser()"
                color="primary" class="form-button pos-right">SIGN UP</button></td>
              <td class="submit-col"><button md-raised-button color="accent"
                class="form-button">LOGIN</button></td>
            </tr></table>
          </form>
        </md-card-content>
      </md-card>
      <md-card class="reg-card" *ngIf="userSignup">
        <md-toolbar color="primary">Create New User</md-toolbar>
        <md-card-content class="reg-content">
          <form #registerForm="ngForm" (ngSubmit)="registerUser(registerForm)">
            <table style="width: 100%" cellspacing="0"><tr>
              <td><md-input name="signup_username" ngModel required placeholder="Username"
                class="user-signup-input" style="width: 100%" autoComplete="off"></md-input></td>
              <td><md-input name="signup_email" ngModel required placeholder="Email"
                class="user-signup-input" style="width: 100%" autoComplete="off"></md-input></td>
            </tr><tr>
              <td><md-input type="password" name="signup_password" ngModel required placeholder="Password"
                class="user-signup-input" style="width: 100%" autoComplete="off"></md-input></td>
              <td><md-input type="password" name="signup_re_password" ngModel required placeholder="Password Again"
                class="user-signup-input" style="width: 100%" autoComplete="off"></md-input></td>
            </tr><tr>
              <td><button md-raised-button type="button" (click)="backButton()"
                color="primary" class="form-button">BACK</button></td>
              <td class="submit-col"><button md-raised-button color="accent">REGISTER</button></td>
            </tr></table>
          </form>
        </md-card-content>
      </md-card>
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
    }
    .reg-card {
    	z-index: 1000;
    	padding: 0;
    }
    .reg-content {
      padding: 10px;
    }
    .form-button {
      margin-right: 2px;
    }
    td {
      padding: 2px;
    }
    .submit-col {
      text-align: right;
    }`]

})
export class SignInOutComponent implements OnInit {
  currentUser: User;
  userSigning: boolean = false;
  userSignup: boolean = false;

  constructor(private userService: UserService, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    if (Cookie.get('token'))
      this.userService.getMe().subscribe(user => this.currentUser = user);
  }

  backButton() {
    this.userSignup = this.userSigning = false;
  }

  login(lf: NgForm) {
    if (!this.userSigning) {
      this.userSigning = true;
    }
    else if (this.userSigning && lf.valid) {
      this.userSigning = false;
      this.userService.login(lf.value.login_email, lf.value.login_password)
        .subscribe(user => this.currentUser = user,
          err => this.errorHandler.error(err));
    }
  }

  logout() {
    this.userService.logout();
    this.currentUser = null;
  }

  registerUser(rf: NgForm) {
    if (this.userSigning) this.userSigning = false;
    if (!this.userSignup) this.userSignup = true;
    else if (this.userSignup && rf.valid && (rf.value.signup_password === rf.value.signup_re_password)) {
      this.userSignup = false;
      this.userService.signup(rf.value.signup_username, rf.value.signup_email, rf.value.signup_password)
        .subscribe(user => this.currentUser = user,
          err => this.errorHandler.error(err));
    }
    else if (rf.value.signup_password !== rf.value.signup_re_password)
      this.errorHandler.error('Inputted passwords are not the same!');
  }
}
