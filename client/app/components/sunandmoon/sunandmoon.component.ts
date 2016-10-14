import { Component } from '@angular/core';

import { ClockService }  from '../../services/clock/clock.service';

@Component({
  selector: 'sun-and-moon',
  providers: [ClockService],
  template: `<h2>{{clock | async | date: 'mediumTime'}}{{clockService.period}}</h2>`

})

export class SunandmoonComponent {

  public clock;

  constructor(public clockService: ClockService) {
    this.clock = this.clockService.currentTime;
  }

}
