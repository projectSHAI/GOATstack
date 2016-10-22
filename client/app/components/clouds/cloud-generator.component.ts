import { Component, OnInit, OnDestroy} from '@angular/core';

import { WonderService } from '../../services/wonder/wonder.service';
import { SocketService } from '../../services/socketio/socketio.service';

import { Wonder } from '../../models/models.namespace';

declare let TweenMax: any;
declare let TimelineMax: any;

@Component({
  selector: 'cloud-generator',
  providers: [WonderService, SocketService],
  template: `
  <li id="hello" *ngFor="let wonder of wonders; let i = index" [style.left.%]="wonder.xcoor" [style.top.%]="wonder.xcoor" class="wonder">
    <img src="assets/cloud1.svg">
    {{cloudAnim()}}
  </li>`
})

export class CloudGeneratorComponent {

  wonders: Wonder[];
  errorMessage: string;
  connection;
  wonder;
  private socket;
  dream = 'Wonders';
  cloud;

  constructor(private wonderService: WonderService) {
    this.socket = new SocketService();
  }

  ngOnInit() {
    this.wonderService.getWonders()
      .subscribe(wonders => {
        this.wonders = wonders;
        this.socket.syncUpdates('Wonder', this.wonders);
      });
  }

  ngOnDestroy() {
    this.socket.unsyncUpdates('Wonder');
  }

  saveWonder(name: string) {
    this.wonderService.saveWonder(name)
      .subscribe(() => {
        // console.log('saveWonder returns');
      });
  }

  cloudAnim() {
    let kiwi = document.getElementById('hello');

    let tl = new TimelineMax();

    tl.to(kiwi, 1, { x: 50 }).to(kiwi, 1, { y: 50 }).to(kiwi, 1, { opacity: 0.5 });
  }
}
