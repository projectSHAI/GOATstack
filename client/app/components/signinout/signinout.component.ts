import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cookie }    from 'ng2-cookies/ng2-cookies';
import { Observable } from 'rxjs/Observable';

import { UserService }  from '../../services/user/user.service';
import { User } from '../../models/models.namespace';

@Component({
  moduleId: module.id,
  selector: 'signinout',
  providers: [UserService],
  template: `
    <div class="user-sign">
      <div>
        <h3 *ngIf="currentUser">Welcome, {{currentUser.userName}}</h3>
        <button *ngIf="!currentUser && !userSignup" type="button" (click)="registerUser()">Sign up</button>
        <button *ngIf="!currentUser && !userSigning && !userSignup" type="button" (click)="login(loginForm)">Sign in</button>
        <button *ngIf="currentUser" type="button" (click)="logout()">Sign out</button>
        <button *ngIf="userSigning || userSignup" type="button" (click)="backButton()">Back</button>
      </div>
      <form #loginForm="ngForm" *ngIf="userSigning" (ngSubmit)="login(loginForm)">
        <input name="email" ngModel required placeholder="Email" class="user-signin-input"/>
        <input type="password" name="password" ngModel required
          placeholder="Password" class="user-signin-input"/>
        <button>Login</button>
      </form>
      <form #registerForm="ngForm" *ngIf="userSignup" (ngSubmit)="registerUser(registerForm)">
        <div>
          <input name="username" ngModel required placeholder="Username" class="user-signup-input"/>
          <input name="email" ngModel required placeholder="Email" class="user-signup-input"/>
        </div>
        <div>
          <input type="password" name="password" ngModel required
            placeholder="Password" xlass="user-signup-input"/>
          <input type="password" name="re_password" ngModel required
            placeholder="Password Again" class="user-signup-input"/>
          <button>Register</button>
        </div>
      </form>
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
  userSigning: boolean = false;
  userSignup: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    if (Cookie.get('token'))
      this.userService.getMe().subscribe(user => this.currentUser = user);
  }

  backButton() {
    this.userSignup = this.userSigning = false;
  }

  login(lf: NgForm) {
    if (!this.userSigning)
      this.userSigning = true;
    else if (this.userSigning && lf.valid) {
      this.userSigning = false;
      this.userService.login(lf.value.email, lf.value.password)
        .subscribe(user => this.currentUser = user);
    }
  }

  logout() {
    this.userService.logout();
    this.currentUser = null;
  }

  registerUser(rf: NgForm) {
    if (!this.userSignup) this.userSignup = true;
    else if (this.userSignup && rf.valid && (rf.value.password === rf.value.re_password)) {
      this.userSignup = false;
      this.userService.signup(rf.value.username, rf.value.email, rf.value.password)
        .subscribe(user => this.currentUser = user);
    }
    else if (rf.value.password !== rf.value.re_password) alert('Passwords are not the same!');
  }
}
