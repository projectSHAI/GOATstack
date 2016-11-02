import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../store';

import { WonderService } from '../services/wonder/wonder.service';
import { SocketService } from '../services/socketio/socketio.service';
import { ErrorHandlerActions } from './error/errorHandler.actions';
import { CloudActions } from './cloud.actions';

@Injectable()
export class WonderActions {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private errorHandler: ErrorHandlerActions,
    private cloudActions: CloudActions,
    private wonderService: WonderService,
    private socket: SocketService) {

  }

  static INITIALIZE_BEFORE_WONDERS: string = 'INITIALIZE_BEFORE_WONDERS';
  static INITIALIZE_AFTER_WONDERS: string = 'INITIALIZE_AFTER_WONDERS';
  static CHANGE_BEFORE_WONDERS: string = 'CHANGE_BEFORE_WONDERS';
  static CHANGE_AFTER_WONDERS: string = 'CHANGE_AFTER_WONDERS';

  initWonders(el) {
    this.wonderService.getWonders()
      .subscribe(wonders => {
        this.ngRedux.dispatch({ type: WonderActions.INITIALIZE_BEFORE_WONDERS, payload: wonders });
        this.ngRedux.dispatch({ type: WonderActions.INITIALIZE_AFTER_WONDERS, payload: wonders });
        wonders.forEach((item, index) => this.cloudActions.cloudType(item.name.length, index));

        this.socket.syncUpdates('Wonder', wonders, 'CHANGE_BEFORE_WONDERS', (item, index) => {
          this.cloudActions.cloudAnimaAfter(el.nativeElement.children[index], item, index);
        });
      });
  }

  saveWonder(wonder: string) {
    this.wonderService.saveWonder(wonder).subscribe(wonder => { }, error => this.errorHandler.showError(error));
  }
}
