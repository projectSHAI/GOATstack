import { Component, OnInit, OnDestroy } from '@angular/core';

import { WonderService } from '../../services/wonder/wonder.service';
import { SocketService } from '../../services/socketio/socketio.service';

import * as Models from '../../models/models.namespace';

@Component({
  selector: 'home-section',
  providers: [WonderService, SocketService],
  moduleId: module.id,
  template: `
    <style>
      .dream-reflection{
        margin: 0 auto;
        display: block;
        text-align: center;
      }
      .dreams-input{
        text-align: center;
        display: block;
        margin: 0 auto;
      }
    </style>
    <h1 class="app-test">Home</h1>

    <li *ngFor="let wonder of wonders">
      <p>{{wonder.name}}</p>
    </li>

    <button type="button" class="btn" (click)="getWonders()">Test Wonders</button>
    <button type="button" class="btn" (click)="saveWonder('test')">add Wonders</button>

    <h1 class="dream-reflection">{{dream}}</h1>

    <input [(ngModel)]="dream" (keyup.enter)="saveWonder(dream)" placeholder="Do you wonder?" class="dreams-input"/>`,
})

export class HomeComponent implements OnInit {
  errorMessage: string;
  wonders: Models.Wonder[];
  connection;
  wonder;
  private socket;
  dream = 'Wonders';

  constructor(private wonderService: WonderService) {
    this.socket = new SocketService();
  }

  ngOnInit() {
    this.wonderService.getWonders()
      .subscribe(wonders => {
        this.wonders = wonders;
        this.socket.syncUpdates('Wonder', this.wonders, res => {
          // callback each time a new wonder comes
        });
      });
  }

  ngOnDestroy() {
    this.socket.unsyncUpdates('Wonder');
  }

  getWonders() {
    // console.log(this.wonders);
  }

  saveWonder(name: string) {
    this.wonderService.saveWonder(name)
      .subscribe(() => {
        // console.log('saveWonder returns');
      });
  }

}
