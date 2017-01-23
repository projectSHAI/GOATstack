import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/index';

//////////////////////////////////////////////////////////////////////
/* Cloud Actions: Used to call dispatches to the cloudStyles and
				  animaArray objects in the store

	CHANGE_STYLES	->	updates cloudStyles with new style string
	CHANGE_ANIMA	->	updates animaArray with a new gsap timeline
*/
//////////////////////////////////////////////////////////////////////
@Injectable()
export class CloudActions {
  constructor(private ngRedux: NgRedux<IAppState>) { }

  static CHANGE_STYLES: string = 'CHANGE_STYLES';
  static CHANGE_ANIMA: string = 'CHANGE_ANIMA';
  static PAUSE_ANIMA: string = 'PAUSE_ANIMA';
  static RESUME_ANIMA: string = 'RESUME_ANIMA';

  changeAnima(anima: any, index: number) {
    this.ngRedux.dispatch({ type: CloudActions.CHANGE_ANIMA, payload: { index: index, timeline: anima } });
  }

  pauseAnima() {
    this.ngRedux.dispatch({ type: CloudActions.PAUSE_ANIMA });
  }

  resumeAnima() {
    this.ngRedux.dispatch({ type: CloudActions.RESUME_ANIMA });
  }

  changeStyle(asset: string, index: number) {
    this.ngRedux.dispatch({ type: CloudActions.CHANGE_STYLES, payload: { index: index, asset: asset } });
  }
}
