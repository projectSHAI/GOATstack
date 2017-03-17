import { Injectable, ElementRef } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../store/index';

// declare global variables to hook onto gsap library
declare let TweenMax: any;
declare let TimelineMax: any;

/////////////////////////////////////////////////////////
/* ErrorHandler Actions: Used to call dispatches to change
      error object in the store

    SHOW_ERROR  ->  updates the error message to display
    HIDE_ERROR  ->  removes error message string
*/
////////////////////////////////////////////////////////
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
