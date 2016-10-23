import { Component, OnInit, OnDestroy, AfterViewInit, Renderer, ViewChild } from '@angular/core';

import { WonderService } from '../../services/wonder/wonder.service';
import { SocketService } from '../../services/socketio/socketio.service';

import { Wonder, cloneWonders } from '../../models/models.namespace';
import CloudProps from './cloud-props';

import * as _ from 'lodash';

@Component({
  selector: 'cloud-generator',
  providers: [WonderService, SocketService],


  template: `
  <div #wonderSky>
  <li #wonderCloud id="wow" *ngFor="let wonder of afterWonders; let i = index" class="wonder">
    <p>{{wonder.name | ngForHook : afterWonders : wonder : wonderCloud : i : cloudAnima}}</p>
    <img src="assets/{{cloudStyle[i]}}.svg">
  </li>
  </div>
  <input [(ngModel)]="dream" (keyup.enter)="saveWonder(dream)" placeholder="Do you wonder?" class="dreams-input"/>
  `,

  styles: [`
    .wonder{
      position: absolute;
      list-style: none;
      opacity: 0;
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
    }
    `]
})

export class CloudGeneratorComponent{
  @ViewChild('wonderSky') wonderSky;

  private socket;
  cloudStyle = CloudProps.cloudStyle;
  cloudAnima = CloudProps.cloudAnima;

  beforeWonders: Wonder[];
  afterWonders: Wonder[];

  errorMessage: string;
  dream = 'Wonders';
  wonderName;

  constructor(private wonderService: WonderService, private renderer: Renderer) {
    this.socket = new SocketService();
  }

  ngOnInit() {
    this.wonderService.getWonders()
      .subscribe(wonders => {
        this.beforeWonders = wonders;

        this.afterWonders = cloneWonders(wonders);
        this.afterWonders.forEach((item, index) => CloudProps.cloudType(item.name.length, index));

        this.socket.syncUpdates('Wonder', this.beforeWonders, (item, index) => {
          CloudProps.cloudAnimaAfter(this.wonderSky.nativeElement.children[index], this.afterWonders, item, index);
        });
      });
  }

  ngOnDestroy() {
    this.socket.unsyncUpdates('Wonder');
  }

  saveWonder(name: string) {
    this.wonderService.saveWonder(name).subscribe();
  }

}
