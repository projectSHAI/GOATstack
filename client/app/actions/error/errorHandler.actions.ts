import { Injectable, ElementRef } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store';

declare let TweenMax: any;
declare let TimelineMax: any;

@Injectable()
export class ErrorHandlerActions {
  timeline: any;

  constructor(private ngRedux: NgRedux<IAppState>) { }

  static SHOW_ERROR: string = 'SHOW_ERROR';
  static HIDE_ERROR: string = 'HIDE_ERROR';

  showError(error: string): void {
    this.ngRedux.dispatch({
      type: ErrorHandlerActions.SHOW_ERROR,
      payload: error
    });
  }

  hideError(): void {
    this.ngRedux.dispatch({ type: ErrorHandlerActions.HIDE_ERROR });
  }

}
