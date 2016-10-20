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
    <img id="hello" src="assets/kiwi.svg">
    <sun-and-moon></sun-and-moon>
    <li *ngFor="let wonder of wonders" [style.left.%]="wonder.xcoor" [style.top.%]="wonder.xcoor" class="wonder">
      <p>{{wonder.name}}</p>
    </li>
    <h1 class="dream-reflection">{{dream}}</h1>
    <input [(ngModel)]="dream" (keyup.enter)="saveWonder(dream)"
      placeholder="Do you wonder?" class="dreams-input"/>`,
  styles: [`
    :host {
      position: relative;
      display: block;
      height: 1000px;
    }
    .wonder{
      position: absolute;
    }
    .dream-reflection{
      margin: 0 auto;
      display: block;
      text-align: center;
    }
    .dreams-input{
      text-align: center;
      display: block;
      margin: 0 auto;
    }`]
})

export class HomeComponent implements OnInit {
  errorMessage: string;
  wonders: Wonder[];
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
        this.socket.syncUpdates('Wonder', this.wonders);
      });

      let kiwi = document.getElementById('hello')


      let tl = new TimelineMax();

  tl.to(kiwi, 1, {x: 50}).to(kiwi, 1, {y: 50}).to(kiwi, 1, {opacity: 0.5});

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
