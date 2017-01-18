import { Component } from '@angular/core';

import { UserActions }  from '../../../header-segment/actions/user/user.actions';

@Component({
  selector: 'user-profile',
  providers: [UserActions],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent {

  firstName = "Chris";
  lastName = "Haugen";
  userName = this.firstName + " " + this.lastName;
  bgImg = "#";
  userImg = "#";

}
