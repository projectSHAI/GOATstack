import { Component, OnInit, OnDestroy } from '@angular/core';

import { WonderService } from '../../services/wonder/wonder.service';
import { SocketService } from '../../services/socketio/socketio.service';

import { Wonder } from '../../models/models.namespace';

//give javascript variables from custom js libraries a type so the
//typescript compiler does not throw an error TS2304: Cannot find name 'var'.
declare let TweenMax: any;
declare let TimelineMax: any;

@Component({
  // moduleId: module.id,
  selector: 'home-section',
  providers: [WonderService, SocketService],




  template: `
    <sun-and-moon [style.left.%]="sunXPos" [style.top.%]="sunYPos" ></sun-and-moon>
    <li id="hello" *ngFor="let wonder of wonders; let i = index" [style.left.%]="wonder.xcoor" [style.top.%]="wonder.xcoor" class="wonder">
      <p>{{wonder.name}}</p>
      <img src="assets/cloud{{((i + 1) % 5) + 1}}.svg">
      {{cloudAnim()}}
    </li>
    <h1 class="dream-reflection">{{dream}}</h1>
    <input [(ngModel)]="dream" (keyup.enter)="saveWonder(dream)"
      placeholder="Do you wonder?" class="dreams-input"/>

        <mountain-range></mountain-range>
        <the-goat></the-goat>

      `,




  styles: [`
    :host {
      position: relative;
      display: block;
      height: 1000px;
    }
    the-goat{
      position: absolute;
      width: 200px;
      height: 200px;
      top: 10%;
      left: 46%;
    }
    mountain-range{
      position: absolute;
      bottom: -400px;
      left: 0;
      right: 0;
    }
    mountain-range img{
      width: 100%;
    }
    sun-and-moon{
      position: fixed;
      display: block;
      height: 300px;
      width: 300px;
    }
    .wonder{
      position: absolute;
      list-style: none;
    }
    .wonder p{
      position: absolute;
      top: 40%;
      left: 45%;
    }
    .dream-reflection{
      margin: 0 auto;
      display: block;
      text-align: center;
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

export class HomeComponent implements OnInit {
  errorMessage: string;
  wonders: Wonder[];
  connection;
  wonder;
  private socket;
  dream = 'Wonders';
  sunXPos: number = 24;
  sunYPos = 1;

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

    tl.to(kiwi, 1, {x: 50}).to(kiwi, 1, {y: 50}).to(kiwi, 1, {opacity: 0.5});
  }

}
