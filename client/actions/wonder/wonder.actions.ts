import { Injectable } from '@angular/core';

import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store/index';

import { WonderService } from '../../core/services/wonder/wonder.service';
import { ErrorHandlerActions } from '../error/errorHandler.actions';

/////////////////////////////////////////////////////////////////////
/* Wonder Actions: used to call dispatches to change the state of the
                   wonder object in the store
    INVALIDATE_WONDER   ->   if api error give error information
    FETCH_WONDER        ->   indicate when wonders are being fetched
    INITIALIZE_WONDERS  ->   initialize the wonders List with json array
    SEND_WONDER         ->   indicate when a wonder has been sent
    CHANGE_WONDERS      ->   update wonder list at index with wonder obj
*/
/////////////////////////////////////////////////////////////////////
@Injectable()
export class WonderActions {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private errorHandler: ErrorHandlerActions,
    private wonderService: WonderService) {  }

  static INVALIDATE_WONDER: string = 'INVALIDATE_WONDER';
  static FETCH_WONDERS: string = 'FETCH_WONDERS';
  static INITIALIZE_WONDERS: string = 'INITIALIZE_WONDERS';
  static SEND_WONDER: string ='SEND_WONDER';
  static CHANGE_WONDERS: string = 'CHANGE_WONDERS';

  invalidateWonder(error: Object): void {
    this.ngRedux.dispatch({ type: WonderActions.INVALIDATE_WONDER, payload: error });
  }

  fetchWonders(): void {
    this.ngRedux.dispatch({ type: WonderActions.FETCH_WONDERS });
  }

  initWonders(wonders: any) {
    this.ngRedux.dispatch({ type: WonderActions.INITIALIZE_WONDERS, payload: wonders });
  }

  sendWonder(): void {
    this.ngRedux.dispatch({ type: WonderActions.SEND_WONDER });
  }

  changeWonder(item: any, index: number) {
    this.ngRedux.dispatch({ type: WonderActions.CHANGE_WONDERS, payload: { index: index, object: item } });
  }

  saveWonder(wonder: string) {
    // change the state to reflect a wonder is being sent
    this.sendWonder();
    this.wonderService.saveWonder(wonder).subscribe(wonder => { }, error => {
      this.invalidateWonder(error);
      this.errorHandler.showError(error.message);
    });
  }
}
