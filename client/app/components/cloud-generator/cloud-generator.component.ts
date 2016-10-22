import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

import { WonderService } from '../../services/wonder/wonder.service';
import { SocketService } from '../../services/socketio/socketio.service';

import { Wonder } from '../../models/models.namespace';

declare let TweenMax: any;
declare let TimelineMax: any;

@Component({
  selector: 'cloud-generator',
  providers: [WonderService, SocketService],
  template: `
    <li #wonderCloud *ngFor="let wonder of wonders; let i = index" [style.left.%]="wonder.xcoor" [style.top.%]="wonder.xcoor" class="wonder">
      <p>{{wonder.name}}</p>
      <img src="assets/{{cloud}}.svg">

    </li>

    <input [(ngModel)]="dream" (keyup.enter)="saveWonder(dream)"
    placeholder="Do you wonder?" class="dreams-input"/>`,
  styles: [`
    .wonder{
      position: absolute;
      list-style: none;
    }
    .wonder p{
      position: absolute;
      top: 40%;
      left: 45%;
    }
    .dreams-input{
      position: absolute;
      left: 45%;
      top: 55%;
      text-align: center;
      display: block;
      z-index: 1000;
    }
    #li{
      position: fixed;
    }`]
})

export class CloudGeneratorComponent {
  @ViewChild('wonderCloud') wonderCloud: ElementRef;

  wonders: Wonder[];
  errorMessage: string;
  connection;
  private socket;
  dream = 'Wonders';
  cloud = 'cloud4';
  randomInt: number;
  wonderName;

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

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  cloudType(wonderName) {

    this.randomInt = this.getRandomInt(1, 3);

    if (wonderName.length <= 4) {
      switch (this.randomInt) {
        case 1:
          this.cloud = 'smallcloud1';
          break;
        case 2:
          this.cloud = 'smallcloud1';
          break;
        case 3:
          this.cloud = 'smallcloud1';
          break;
      }
    }
    else if (wonderName.length > 4 && wonderName.length <= 15) {
      switch (this.randomInt) {
        case 1:
          this.cloud = 'mediumcloud2';
          break;
        case 2:
          this.cloud = 'mediumcloud2';
          break;
        case 3:
          this.cloud = 'mediumcloud2';
          break;
      }
    }
    else {
      switch (this.randomInt) {
        case 1:
          this.cloud = 'largecloud3';
          break;
        case 2:
          this.cloud = 'largecloud3';
          break;
        case 3:
          this.cloud = 'largecloud3';
          break;
      }
      console.log(wonderName.length);
    }
  }

  cloudAnim() {
    let kiwi = this.wonderCloud;

    let tl = new TimelineMax();

    tl.to(kiwi, 1, { x: 50 }).to(kiwi, 1, { y: 50 }).to(kiwi, 1, { opacity: 0.5 });
  }
}
