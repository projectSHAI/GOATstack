import { Injectable } from '@angular/core';

import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/index';

import { WonderService } from '../../services/wonder/wonder.service';
import { ErrorHandlerActions } from '../error/errorHandler.actions';

/////////////////////////////////////////////////////////////////////
/* Wonder Actions: used to call dispatches to change the state of the
                   wonder object in the store

    INITIALIZE_WONDERS  ->   initialize the wonders List with json array
    CHANGE_WONDERS      ->   update wonder list at index with wonder obj
*/
/////////////////////////////////////////////////////////////////////
@Injectable()
export class WonderActions {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private errorHandler: ErrorHandlerActions,
    private wonderService: WonderService) {  }

  static INITIALIZE_WONDERS: string = 'INITIALIZE_WONDERS';
  static CHANGE_WONDERS: string = 'CHANGE_WONDERS';

  initWonders(wonders: any) {
    this.ngRedux.dispatch({ type: WonderActions.INITIALIZE_WONDERS, payload: wonders });
  }

  changeWonder(item: any, index: number) {
    this.ngRedux.dispatch({ type: WonderActions.CHANGE_WONDERS, payload: { index: index, object: item } });
  }

  saveWonder(wonder: string) {
    this.wonderService.saveWonder(wonder).subscribe(wonder => { }, error => this.errorHandler.showError(error));
  }
}
