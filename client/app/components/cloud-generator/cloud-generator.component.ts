import { Component, OnInit, OnDestroy, AfterViewInit, Renderer } from '@angular/core';

import { WonderService } from '../../services/wonder/wonder.service';
import { SocketService } from '../../services/socketio/socketio.service';

import { Wonder } from '../../models/models.namespace';
import CloudProps from './cloud-props';

@Component({
  selector: 'cloud-generator',
  providers: [WonderService, SocketService],


  template: `
  <div>
  <li #wonderCloud id="wow" *ngFor="let wonder of wonders; let i = index" class="wonder">
    <p>{{wonders[i].name | ngForHook:wonder:wonderCloud:i:cloudAnima}}</p>
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

  private socket;
  wonders: Wonder[];
  cloudStyle = CloudProps.cloudStyle;
  cloudAnima = CloudProps.cloudAnima;

  errorMessage: string;
  dream = 'Wonders';
  wonderName;

  constructor(private wonderService: WonderService, private renderer: Renderer) {
    this.socket = new SocketService();
  }

  ngOnInit() {
    this.wonderService.getWonders()
      .subscribe(wonders => {
        this.wonders = wonders;
        this.socket.syncUpdates('Wonder', this.wonders);

        this.wonders.forEach((item, index) => CloudProps.cloudType(item.name.length, index));
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

}
