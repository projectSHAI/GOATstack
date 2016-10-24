import { Component } from '@angular/core';

@Component({
  // moduleId: module.id,
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent {

  firstName = "Chris";
  lastName = "Haugen";
  userName = this.firstName + " " + this.lastName;
  bgImg = "#";
  userImg = "#";

}
