
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select } from 'ng2-redux';

import { WonderActions } from '../../actions/wonder/wonder.actions';
import { CloudActions } from '../../actions/cloud/cloud.actions';
import { WonderService } from '../../services/wonder/wonder.service';
import { SocketService } from '../../../main-segment/services/socketio/socketio.service';

declare let TweenMax: any;
declare let TimelineMax: any;
declare let Power0: any;

@Component({
  selector: 'cloud-generator',
  providers: [WonderActions, CloudActions],
  templateUrl: './cloud-generator.component.html',
  styleUrls: ['./cloud-generator.component.css']
})

export class CloudGeneratorComponent implements OnInit, OnDestroy {
  @select('cloudStyle') cloudStyle$: Observable<any>;
  @select('animaArray') animaArray$: Observable<any>;
  @select('wonder') wonder$: Observable<any>;
  @select('timeOfDay') toda$: Observable<any>;
  private animaArray: any;
  private cloudStyle: any;
  private width: number;
  private pause: boolean = false;
  private scrollTop: number;

  @ViewChild('wonderSky') wonderSky;

  constructor(
    public wonderActions: WonderActions,
    private wonderService: WonderService,
    private cloudActions: CloudActions,
    private socket: SocketService) { }
  
  ngOnInit() {
    this.width = window.innerWidth;
    this.animaArray$.subscribe(anima => this.animaArray = anima);
    this.toda$.subscribe(x => this.wonderSky.nativeElement.style.filter = x.get('cloudBrightness')); 
    // Change the state to indicate wonders are being fetched
    this.wonderActions.fetchWonders();
    this.wonderService.getWonders().subscribe(wonders => {
        // initialize store wonders
        this.wonderActions.initWonders(wonders);
        // initialize store cloudStyle
        wonders.forEach((item, index) => this.cloudType(item.name.length, index));
        // initialize socketio listener with backCall and delay till callback
        // For more information look inside the socketio.service
        this.socket.syncUpdates('Wonder', wonders, ['CHANGE_WONDERS'], null, (item, index) => {

          // before the socket update the wonders store List, fade out the
          // cloud that will be changing with the upcoming wonder so the user
          // does not see the text change, only the fade
          TweenMax.to(this.wonderSky.nativeElement.children[index], 1, {
            opacity: 0,
            callbackScope: this,
            onComplete: this.cloudType,
            onCompleteParams: [item.name.length, index, true]
          });

        }, 1250); // Give a little more time to render the new cloud style
      });     
  }

  ngOnDestroy() {
    // detach socket listener when component is destroyed
    this.socket.unsyncUpdates('Wonder');
  }

  // Called when cloud reach the end of the screen
  private loopAnima(index: number): void {
    this.animaArray.get(index).play('loop');
  }

  private speed(pos: number, min: number, max: number, factor: number): number {
    // find the speed by dividing the percentage left till off the screen
    // by the amount of %/second you want all clouds to travel at
    // and you will get the seconds necessary to travel the remaining
    // distance. Add a random number to get a virtual speed diff
    const speed = (100 - pos + this.rndInt(min, max))/factor;
    // make sure the time doesn't fall bellow a minimum threshold
    return speed > 8 ? speed : 8;
  }

  private rndInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  cloudAnima(value: string, el: ElementRef, object: any, index: number): string {
    // This function will be called every time a new wonder arrives
    // after initial start of the app this should always fire
    if (this.animaArray.size === 10)
      this.animaArray.get(index).kill();
    // the travel finds the amount of pixels left the cloud
    // must travel to get to the end of the screen from the % xcoor
    const travel = this.width - (this.width * (object.xcoor/100));
    // Since we want all the cloud to move accross the screen at the
    // same speed we need a constant factor to divide the delta
    const factor = 2.5;
    // rf values are for random factor to simulate speed difference
    // relative to the constant speed
    const rfMin = -15;
    const rfMax = 15;

    // Create the gsap timeline to loop
    const anima = new TimelineMax({
      callbackScope: this,
      onComplete: this.loopAnima,
      onCompleteParams: [index]
    });

    anima.to(el, this.rndInt(1,3), { opacity: 1 })
      .to(el, this.speed(object.xcoor,rfMin,rfMax,factor), { ease: Power0.easeNone, x: travel, y: this.rndInt(-100, 100) }, 0)
      .addLabel('loop', '+=0')
      .to(el, 0, { ease: Power0.easeNone, left: '-350px', x: '0', y: '0' })
      .to(el, this.speed(-10,rfMin,rfMax,factor), { ease: Power0.easeNone, x: this.width + 350, y: this.rndInt(-100, 100) });

    // Push new gsap timeline to animaArray List
    this.cloudActions.changeAnima(anima, index);
    return value;
  }

  cloudType(wonderLength: number, index: number): void {
    // every cloud size has three types
    let randomInt = this.rndInt(1, 3);

    if (wonderLength <= 4) {
      switch (randomInt) {
        case 1:
          this.cloudActions.changeStyle('smallcloud1', index);
          break;
        case 2:
          this.cloudActions.changeStyle('smallcloud2', index);
          break;
        case 3:
          this.cloudActions.changeStyle('smallcloud3', index);
          break;
      }
    }
    else if (wonderLength > 4 && wonderLength <= 15) {
      switch (randomInt) {
        case 1:
          this.cloudActions.changeStyle('mediumcloud1', index);
          break;
        case 2:
          this.cloudActions.changeStyle('mediumcloud2', index);
          break;
        case 3:
          this.cloudActions.changeStyle('mediumcloud3', index);
          break;
      }
    }
    else {
      switch (randomInt) {
        case 1:
          this.cloudActions.changeStyle('largecloud1', index);
          break;
        case 2:
          this.cloudActions.changeStyle('largecloud2', index);
          break;
        case 3:
          this.cloudActions.changeStyle('largecloud3', index);
          break;
      }
    }

  }

  submitWonder(dream: string) {
    this.wonderActions.saveWonder(dream);
    return dream = '';
  }

  @HostListener('window:scroll', ['$event'])
  scroll(event) {
      this.scrollTop = document.body.scrollTop;

      if(this.scrollTop <= 1080 && this.pause === true) {
          this.cloudActions.resumeAnima();
          this.pause = false;
      }
      if(this.scrollTop >= 1080 && this.pause === false) {
          this.cloudActions.pauseAnima();
          this.pause = true;
      }

  }

}
