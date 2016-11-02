import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select } from 'ng2-redux';

import { WonderActions } from '../../actions/wonder/wonder.actions';
import { ClockService } from '../../services/clock/clock.service';
import { SocketService } from '../../services/socketio/socketio.service';
import { CloudActions } from '../../actions/cloud/cloud.actions';

@Component({
  selector: 'cloud-generator',
  providers: [WonderActions, CloudActions],
  templateUrl: './cloud-generator.component.html',
  styleUrls: ['./cloud-generator.component.scss']
})

export class CloudGeneratorComponent {
  @select('cloudStyle') cloudStyle$: Observable<any>;
  @select('afterWonder') afterWonder$: Observable<any>;

  @ViewChild('wonderSky') wonderSky;

  constructor(
    private wonderActions: WonderActions,
    private cloudActions: CloudActions,
    private socket: SocketService,
    private clockService: ClockService) { }

  ngOnInit() {
    this.wonderActions.initWonders(this.wonderSky);
    this.clockService.currentTime.subscribe(time => this.timeOfDayCss());
  }

  ngOnDestroy() {
    this.socket.unsyncUpdates('Wonder');
  }

  timeOfDayCss() {
    if(this.clockService.sunRise) {
      this.wonderSky.nativeElement.style.filter = "brightness(70%)";
    }
    else if(this.clockService.dayTime) {
      this.wonderSky.nativeElement.style.filter = "brightness(100%)";
    }
    else if(this.clockService.sunSet) {
      this.wonderSky.nativeElement.style.filter = "brightness(70%)";
    }
    else if(this.clockService.nightTime) {
      console.log(this.wonderSky.nativeElement.children.length);

      this.wonderSky.nativeElement.style.filter = "brightness(30%)";
    }
    else{
      console.log('time of day not valid check sky.component.ts');
    }
  }

}
