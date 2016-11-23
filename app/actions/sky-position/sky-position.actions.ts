import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/index';

@Injectable()
export class SkyPositionActions {
  
  constructor(private ngRedux: NgRedux<IAppState>) {}

  static UPDATE_SKY_POSITION: string = 'UPDATE_SKY_POSITION';

  updateSkyPosition(): void {
    this.ngRedux.dispatch({ type: SkyPositionActions.UPDATE_SKY_POSITION });
  }

}