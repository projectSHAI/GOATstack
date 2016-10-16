import { Component } from '@angular/core';

@Component({
  // moduleId: module.id,
  selector: 'user-profile',
  template: `
    <img class="background" src="{{bgImg}}" />
      <section class="user-card">
        <img class="user-img" src="{{userImg}}" />
        <p class="user-name">{{userName}}</p>
      </section>
      <section class="user-body">
    </section>`
})

export class UserProfileComponent {

  firstName = "Chris";
  lastName = "Haugen";
  userName = this.firstName + " " + this.lastName;
  bgImg = "#";
  userImg = "#";

}
