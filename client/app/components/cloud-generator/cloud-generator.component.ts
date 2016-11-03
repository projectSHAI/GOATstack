import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select } from 'ng2-redux';

import { WonderActions } from '../../actions/wonder/wonder.actions';
import { WonderService } from '../../services/wonder/wonder.service';
import { ClockService } from '../../services/clock/clock.service';
import { SocketService } from '../../services/socketio/socketio.service';
import { CloudActions } from '../../actions/cloud/cloud.actions';

declare let TweenMax: any;

@Component({
  selector: 'cloud-generator',
  providers: [WonderActions, CloudActions],
  templateUrl: './cloud-generator.component.html',
  styleUrls: ['./cloud-generator.component.scss']
})

export class CloudGeneratorComponent {
  @select('cloudStyle') cloudStyle$: Observable<any>;
  @select('wonder') wonder$: Observable<any>;

  @ViewChild('wonderSky') wonderSky;

  constructor(
    private wonderActions: WonderActions,
    private wonderService: WonderService,
    private cloudActions: CloudActions,
    private socket: SocketService,
    private clockService: ClockService) { }

  ngOnInit() {
    this.clockService.currentTime.subscribe(time => this.timeOfDayCss());
    this.wonderService.getWonders()
      .subscribe(wonders => {
        // initialize store wonders
        this.wonderActions.initWonders(wonders);
        // initialize store cloudStyle
        wonders.forEach((item, index) => this.cloudActions.cloudType(item.name.length, index));
        // initialize socketio listener with backCall and delay till callback
        this.socket.syncUpdates('Wonder', wonders, ['CHANGE_WONDERS'], null, (item, index) => {

          TweenMax.to(this.wonderSky.nativeElement.children[index], 1, {
            opacity: 0,
            callbackScope: this.cloudActions,
            onComplete: this.cloudActions.cloudType,
            onCompleteParams: [item.name.length, index, true]
          });

        }, 1000);
      });
  }

  ngOnDestroy() {
    // detach socket listening when component is destroyed
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
