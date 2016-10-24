import { Component } from '@angular/core';

import { ClockService }  from '../../services/clock/clock.service';

@Component({
  selector: 'celestial-bodies',
  providers: [ClockService],
  templateUrl: './celestial-bodies.component.html',
  styleUrls: ['./celestial-bodies.component.scss']
})

export class CelestialBodiesComponent {

  public dayTime: boolean;
  public clock: any;
  clockAlign: number = 37;

  constructor(public clockService: ClockService) {
    this.clock = this.clockService.currentTime;
    this.dayTime = this.clockService.dayTime;
  }

}
