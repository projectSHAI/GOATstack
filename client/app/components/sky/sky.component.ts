import { Component } from '@angular/core';

import { ClockService }  from '../../services/clock/clock.service';

@Component({
  selector: 'the-sky',
  providers: [ClockService],
  templateUrl: './sky.component.html',
  styleUrls: ['./sky.component.scss']
})

export class SkyComponent {

  public dayTime: boolean;
  public clock: any;
  clockAlign: number = 37;

  constructor(public clockService: ClockService) {
    this.clock = this.clockService.currentTime;
    this.dayTime = this.clockService.dayTime;
  }

}
