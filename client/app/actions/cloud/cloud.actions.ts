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
  private width: number;

  constructor(private ngRedux: NgRedux<IAppState>) {
    this.width = window.innerWidth;
    this.animaArray$.subscribe(anima => this.animaArray = anima);
  }

  static CHANGE_STYLES: string = 'CHANGE_STYLES';
  static CHANGE_ANIMA: string = 'CHANGE_ANIMA';

  private loopAnima(index: number): void {
    this.animaArray.get(index).restart();
  }

  cloudType(wonderLength: number, index: number, killTime: boolean = false): void {
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
    if (this.animaArray.size === 10)
      this.animaArray.get(index).kill();

    const anima = new TimelineMax({
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

  rndInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
