import { Injectable, ElementRef } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';

declare let TweenMax: any;
declare let TimelineMax: any;

@Injectable()
export class ErrorHandlerActions {
  timeline: any;

  constructor(private ngRedux: NgRedux<IAppState>) { }

  static SHOW_ERROR: string = 'SHOW_ERROR';
  static HIDE_ERROR: string = 'HIDE_ERROR';

  initHandler(el: ElementRef) {
    this.timeline = new TimelineMax({ paused:true });

    this.timeline.to(el, 1, { opacity: 1 })
      .to(el, 1, { opacity: 0 }, "+=3")
      .add(() => this.hideError());
  }

  showError(error: string): void {
    this.ngRedux.dispatch({
      type: ErrorHandlerActions.SHOW_ERROR,
      payload: error
    });
    this.timeline.play(0);
  }

  hideError(): void {
    this.ngRedux.dispatch({
      type: ErrorHandlerActions.HIDE_ERROR,
      payload: ''
    });
  }

}
