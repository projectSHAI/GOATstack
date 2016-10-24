import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cookie }    from 'ng2-cookies/ng2-cookies';
import { Observable } from 'rxjs/Observable';

import { UserService }  from '../../services/user/user.service';
import { ErrorHandlerService } from '../../services/errorHandler/errorHandler.service';
import { User } from '../../models/models.namespace';

@Component({
  selector: 'signinout',
  providers: [UserService],
  templateUrl: './signinout.component.html',
  styleUrls: ['./signinout.component.scss']
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
