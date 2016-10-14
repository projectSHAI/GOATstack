import { Component } from '@angular/core';

@Component({
  selector: 'main-navbar',
  template: `
      <a md-raised-button color="primary" routerLink='/' routerLinkActive='active' [routerLinkActiveOptions]="{exact:true}">Home</a>
      <a md-raised-button color="primary" routerLink='/profile' routerLinkActive='active'>Profile</a>
      <a md-raised-button color="primary" routerLink='/yoloswaq69420blazeitfgt' routerLinkActive='active'>404</a>
    `,
  styles: [`
      .active{
        color: orange;
      }
      :host{
        position: absolute;
        top: 0;
        left: 0;
        margin: 23px 5%;
      }
      a:hover{
        cursor: pointer;
      }
    `]
})

export class NavbarComponent {

}
