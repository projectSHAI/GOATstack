import { Component } from '@angular/core';
import { Cookie }    from 'ng2-cookies/ng2-cookies';
import{ Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

import { UserService }  from '../../services/user/user.service';
import { ClockService } from '../../services/clock/clock.service';

import { User } from '../../models/user/user.model';

@Component({
  selector: 'header-section',
  providers: [
    UserService,
    ClockService
  ],
  moduleId: module.id,
  templateUrl: 'header.html',
  styleUrls: ['header.css']
})

export class HeaderComponent {
  errorMessage: string;
  currentUser: User;
  clock = this.clockService.currentTime;

  constructor(
    private userService: UserService,
    private clockService: ClockService
  ) { }

  ngOnInit() {
    let token = Cookie.get('token');
    if (token)
      this.userService.getMe()
        .subscribe(user => {
          this.currentUser = user;
        });
  }

  login(email: string, password: string) {
    this.userService.login(email, password)
      .subscribe(() => {
        return this.userService.getMe()
          .subscribe(user => {
            this.currentUser = user;
          })
      });
  }

  logout() {
    this.userService.logout();
    this.currentUser = null;
  }

  registerUser(name: string, email: string, password: string) {
    this.userService.signup(name, email, password)
      .subscribe(() => {
        return this.userService.getMe()
          .subscribe(user => {
            this.currentUser = user;
          })
      });
  }

  testUser() {
    this.login('jc.thomas4214@gmail.com', 'flight1855');
  }

  testRegisterUser() {
    this.registerUser('Jason', 'jc.thomas4214@gmail.com', 'flight1855');
  }
}
