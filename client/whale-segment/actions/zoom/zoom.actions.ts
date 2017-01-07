import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../../store/index';

@Injectable()
export class ZoomActions {
  
  constructor(private ngRedux: NgRedux<IAppState>) {}

  static UPDATE_SHOW_HIDE: string = 'UPDATE_SHOW_HIDE';

  updateShowHide(): void {
    this.ngRedux.dispatch({ type: ZoomActions.UPDATE_SHOW_HIDE });
  }

}