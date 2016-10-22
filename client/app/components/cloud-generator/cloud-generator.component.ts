import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, Renderer } from '@angular/core';

import { WonderService } from '../../services/wonder/wonder.service';
import { SocketService } from '../../services/socketio/socketio.service';

import { Wonder } from '../../models/models.namespace';
import CloudProps from './cloud-props';

declare let TweenMax: any;
declare let TimelineMax: any;

@Component({
  selector: 'cloud-generator',
  providers: [WonderService, SocketService],


  template: `
  <div #wonderCloud>
  <li id="wow" *ngFor="let wonder of wonders; let i = index" [style.left.%]="wonder.xcoor" [style.top.%]="wonder.xcoor" class="wonder">
    <p>{{wonders[i].name}}</p>
    <img src="assets/{{cloudStyle[i]}}.svg">
  </li>
  </div>
  <input [(ngModel)]="dream" (keyup.enter)="saveWonder(dream)" placeholder="Do you wonder?" class="dreams-input"/>
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

  private socket;
  wonders: Wonder[];
  cloudStyle = CloudProps.cloudStyle;

  errorMessage: string;
  dream = 'Wonders';
  wonderName;

  constructor(private wonderService: WonderService, private renderer: Renderer) {
    this.socket = new SocketService();
    // this.cb = new CloudProps();
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

        this.wonders.forEach(item => CloudProps.cloudType(item.name.length));

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
    let kiwi = document.getElementById('wow');

    let tl = new TimelineMax();

    tl.to(kiwi, 1, {x: CloudProps.getRandomInt(1, 1000)}).to(kiwi, 1, {y: CloudProps.getRandomInt(1, 1000)}).to(kiwi, 1, {opacity: 0.5});
  }


}
