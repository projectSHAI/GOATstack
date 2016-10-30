import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select } from 'ng2-redux';

import { WonderService } from '../../services/wonder/wonder.service';
import { ClockService } from '../../services/clock/clock.service';
import { SocketService } from '../../services/socketio/socketio.service';
import { CloudActions } from '../../actions/cloud.actions';

import { Wonder, cloneWonders } from '../../models/models.namespace';

@Component({
  selector: 'cloud-generator',
  providers: [WonderService, CloudActions],
  templateUrl: './cloud-generator.component.html',
  styleUrls: ['./cloud-generator.component.scss']
})

export class CloudGeneratorComponent {
  @select('cloud') cloud$: Observable<any>;

  @ViewChild('wonderSky') wonderSky;

  beforeWonders: Wonder[];
  afterWonders: Wonder[];

  dream = 'Wonders';

  constructor(
    private wonderService: WonderService,
    private socket: SocketService,
    private cp: CloudActions,
    private clockService: ClockService) { }

  ngOnInit() {
    this.wonderService.getWonders()
      .subscribe(wonders => {
        this.beforeWonders = wonders;

        this.afterWonders = cloneWonders(wonders);
        this.afterWonders.forEach((item, index) => this.cp.cloudType(item.name.length, index));

        this.socket.syncUpdates('Wonder', this.beforeWonders, (item, index) => {
          this.cp.cloudAnimaAfter(this.wonderSky.nativeElement.children[index], this.afterWonders, item, index);
        });
      });

    this.clockService.currentTime.subscribe(time => this.timeOfDayCss());
  }

  ngOnDestroy() {
    this.socket.unsyncUpdates('Wonder');
  }

  saveWonder(name: string) {
    this.wonderService.saveWonder(name).subscribe();
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
