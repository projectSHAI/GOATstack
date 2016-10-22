import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, Renderer } from '@angular/core';

import { WonderService } from '../../services/wonder/wonder.service';
import { SocketService } from '../../services/socketio/socketio.service';

import { Wonder } from '../../models/models.namespace';

declare let TweenMax: any;
declare let TimelineMax: any;

@Component({
  selector: 'cloud-generator',
  providers: [WonderService, SocketService],


  template: `
  <div #wonderCloud>
  <li *ngFor="let wonder of wonders; let i = index" [style.left.%]="wonder.xcoor" [style.top.%]="wonder.xcoor" class="wonder">
    <p>{{wonders[i].name}}</p>
    <img src="assets/{{cloudStyle[i]}}.svg">

  </li>
  </div>
  <input [(ngModel)]="dream" (keyup.enter)="saveWonder(dream)"
    placeholder="Do you wonder?" class="dreams-input"/>
  `,

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
    }
    `]
})

export class CloudGeneratorComponent implements AfterViewInit{
  @ViewChild('wonderCloud') wonderCloud;

  wonders: Wonder[];
  errorMessage: string;
  connection;
  private socket;
  dream = 'Wonders';
  cloudStyle: Array<string> = [];
  randomInt: number;
  wonderName;

  constructor(private wonderService: WonderService, private renderer: Renderer) {
    this.socket = new SocketService();
  }
  ngAfterViewInit() {

    let nl = this.renderer.createViewRoot(this.wonderCloud.nativeElement);

    document.addEventListener('DOMContentLoaded', function(){
      let xx = nl.children;
      console.log(xx[1]);
    });

  }
  ngOnInit() {
    this.wonderService.getWonders()
      .subscribe(wonders => {
        this.wonders = wonders;
        this.socket.syncUpdates('Wonder', this.wonders);

        this.wonders.forEach(item => this.cloudType(item.name.length));
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

    if(wonderName <= 4) {
      switch(this.randomInt) {
        case 1:
            this.cloudStyle.push('smallcloud1');
            break;
        case 2:
            this.cloudStyle.push('smallcloud1');
            break;
        case 3:
            this.cloudStyle.push('smallcloud1');
            break;
      }
    }
    else if(wonderName > 4 && wonderName <= 15) {
      switch(this.randomInt) {
        case 1:
            this.cloudStyle.push('mediumcloud2');
            break;
        case 2:
            this.cloudStyle.push('mediumcloud2');
            break;
        case 3:
            this.cloudStyle.push('mediumcloud2');
            break;
      }
    }
    else{
      switch(this.randomInt) {
        case 1:
            this.cloudStyle.push('largecloud3');
            break;
        case 2:
            this.cloudStyle.push('largecloud3');
            break;
        case 3:
            this.cloudStyle.push('largecloud3');
            break;
      }
      console.log(wonderName);
    }
  }

  cloudAnim() {
    let kiwi = this.wonderCloud;

    let tl = new TimelineMax();

    tl.to(kiwi, 1, {x: 50}).to(kiwi, 1, {y: 50}).to(kiwi, 1, {opacity: 0.5});
  }


}
