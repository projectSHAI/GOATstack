import { Injectable, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../../store';

import { WonderActions } from '../wonder/wonder.actions';

declare let TweenMax: any;
declare let TimelineMax: any;
declare let Power0: any;

@Injectable()
export class CloudActions {
  @select('animaArray') animaArray$: Observable<any>;

  private animaArray: any;
  private afterWonders: any;

  private width: number;

  constructor(private ngRedux: NgRedux<IAppState>) {
    this.width = window.innerWidth;
    this.animaArray$.subscribe(anima => this.animaArray = anima);
  }

  static CHANGE_STYLES: string = 'CHANGE_STYLES';
  static CHANGE_ANIMA: string = 'CHANGE_ANIMA';

  private cloudAnimaAfterCB(item: any, index: number): void {
    // First kill the old timeline ddetaching it from the parent obj
    this.animaArray.get(index).kill();
    // Then push the new wonder to the dom to trigger update
    this.ngRedux.dispatch({ type: WonderActions.CHANGE_AFTER_WONDERS, payload: { index: index, object: item } });
  }

  private loopAnima(index: number): void {
    this.animaArray.get(index).restart();
  }

  cloudType(wonderLength: number, index: number): void {
    let randomInt = this.rndInt(1, 3);

    if (wonderLength <= 4) {

      switch (randomInt) {
        case 1:
          this.ngRedux.dispatch({ type: CloudActions.CHANGE_STYLES, payload: { index: index, asset: 'smallcloud1' } });
          break;
        case 2:
          this.ngRedux.dispatch({ type: CloudActions.CHANGE_STYLES, payload: { index: index, asset: 'smallcloud2' } });
          break;
        case 3:
          this.ngRedux.dispatch({ type: CloudActions.CHANGE_STYLES, payload: { index: index, asset: 'smallcloud3' } });
          break;
      }

    }
    else if (wonderLength > 4 && wonderLength <= 15) {

      switch (randomInt) {
        case 1:
          this.ngRedux.dispatch({ type: CloudActions.CHANGE_STYLES, payload: { index: index, asset: 'mediumcloud1' } });
          break;
        case 2:
          this.ngRedux.dispatch({ type: CloudActions.CHANGE_STYLES, payload: { index: index, asset: 'mediumcloud2' } });
          break;
        case 3:
          this.ngRedux.dispatch({ type: CloudActions.CHANGE_STYLES, payload: { index: index, asset: 'mediumcloud3' } });
          break;
      }

    }
    else {

      switch (randomInt) {
        case 1:
          this.ngRedux.dispatch({ type: CloudActions.CHANGE_STYLES, payload: { index: index, asset: 'largecloud1' } });
          break;
        case 2:
          this.ngRedux.dispatch({ type: CloudActions.CHANGE_STYLES, payload: { index: index, asset: 'largecloud2' } });
          break;
        case 3:
          this.ngRedux.dispatch({ type: CloudActions.CHANGE_STYLES, payload: { index: index, asset: 'largecloud3' } });
          break;
      }

    }
  }

  cloudAnima(value: string, el: ElementRef, object: any, index: number): string {
    let anima = new TimelineMax({
      callbackScope: this,
      onComplete: this.loopAnima,
      onCompleteParams: [index]
    });

    // TODO: find a way to get the initial element position to subtract from innerWidth
    anima
      .to(el, 0, { ease: Power0.easeNone, left: '-350px', x: '0', y: '0' })
      .to(el, this.rndInt(30, 85), { ease: Power0.easeNone, x: 1707 + 350, y: this.rndInt(-200, 200) });

    // Push new gsap timeline to animaArray List
    this.ngRedux.dispatch({ type: CloudActions.CHANGE_ANIMA, payload: { index: index, timeline: anima } });
    return value;
  }

  cloudAnimaAfter(el: ElementRef, item: any, index: number): void {
    // Make two TweenMax with the same delay
    // The first will take 1 second the change opacity to 0
    TweenMax.to(el, 1, {
      opacity: 0,
      callbackScope: this,
      onComplete: this.cloudType,
      onCompleteParams: [item.name.length, index]
    });
    // The second one will call the afterCB to start the loop
    TweenMax.to(el, 1, {
      callbackScope: this,
      onComplete: this.cloudAnimaAfterCB,
      onCompleteParams: [item, index]
    });
  }

  rndInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
