import { Component, Input } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { UserService } from '../../services/user.service';

export class User {
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

@Component({
  selector: 'header-section',
  providers: [UserService],
  moduleId: module.id,
  templateUrl: 'header.html',
  styleUrls: ['header.css']
})

export class HeaderComponent {
  errorMessage: string;
  user: User;

  constructor(private userService: UserService) {}

  ngOnInit() {
    let token = Cookie.get('token');
    if (token)
      console.log(token);
    // this.testUser();
  }

  login(email: string, password: string) {
    this.userService.login(email, password)
      .subscribe(user => this.user = user, () => {
        console.log(this.user);
      });
  }

  logout() {
    this.userService.logout();
  }

  registerUser(name: string, email: string, password: string) {
    this.userService.signup(name, email, password)
      .subscribe(obj => {
        console.log(obj);
      });
  }

  testUser() {
    this.login('jc.thomas4214@gmail.com', 'flight1855');
  }

  testRegisterUser() {
    this.registerUser('Jason', 'jc.thomas4214@gmail.com', 'flight1855');
  }
}
