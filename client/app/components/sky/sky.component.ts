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
  public sunMoonGlow: string = "0px 0px 100px 12px orange";

  constructor(public clockService: ClockService) {
    this.clock = this.clockService.currentTime;
    this.dayTime = this.clockService.dayTime;
  }


  rgbToHex() {
    //make a function that converts rgba and returns a hex
  }


}
