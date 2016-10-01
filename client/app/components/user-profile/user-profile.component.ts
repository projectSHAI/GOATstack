import { Component } from '@angular/core';

@Component({
  selector: 'user-profile',
  moduleId: module.id,
  templateUrl: 'user-profile.html',
  styleUrls: ['user-profile.css']
})

export class UserProfileComponent {

  firstName = "Chris";
  lastName = "Haugen";
  userName = this.firstName + " " + this.lastName;
  bgImg = "#";
  userImg = "#";

}
