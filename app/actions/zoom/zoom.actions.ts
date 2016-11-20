import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/index';

@Injectable()
export class ZoomActions {
  
  constructor(private ngRedux: NgRedux<IAppState>) {}

  static UPDATE_TIMELINES: string = 'UPDATE_TIMELINES';
  static UPDATE_SHOW_HIDE: string = 'UPDATE_SHOW_HIDE';

  updateTimelines(tls: Object): void {
    this.ngRedux.dispatch({ type: ZoomActions.UPDATE_TIMELINES, payload: tls });
  }

  updateShowHide(): void {
    this.ngRedux.dispatch({ type: ZoomActions.UPDATE_SHOW_HIDE });
  }

}