import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ClockService } from '../../services/clock/clock.service';

@Component({
  moduleId: module.id,
  selector: 'header-section',
  providers: [ClockService],
  template: `
    <header>
      <a routerLink='/' routerLinkActive='active' [routerLinkActiveOptions]="{exact:true}">Home</a>
      <a routerLink='/profile' routerLinkActive='active'>Profile</a>
      <a routerLink='/yoloswaq69420blazeitfgt' routerLinkActive='active'>404</a>
      <signinout></signinout>
      <h1 class='app-title'>MEA2N Fullstack</h1>
      <h2>{{clock | async | date: 'mediumTime'}}{{clockService.period}}</h2>
    </header>`,
  styles: [`
    header{
      background: rgb(55, 129, 215);
      position: relative;
    }
    .app-title{
      font-family: cursive;
      padding: 15px;
      text-align: center;
      font-size: 36px;
      color: white;
    }
    .active{
      color: orange;
    }`]
})

export class HeaderComponent {
  public clock;

  constructor(private clockService: ClockService) {
    this.clock = this.clockService.currentTime;
  }
}
