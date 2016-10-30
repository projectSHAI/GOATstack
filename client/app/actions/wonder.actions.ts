import { Injectable } from '@angular/core';

import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { WonderService } from '../services/wonder/wonder.service';
import { ErrorHandlerActions } from '../actions/errorHandler.actions';

@Injectable()
export class WonderActions {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private errorHandler: ErrorHandlerActions,
    private wonderService: WonderService) { }

  getWonders() {
    // this.wonderService.getWonders()
    //   .subscribe(wonders => {
    //     this.beforeWonders = wonders;
    //
    //     this.afterWonders = cloneWonders(wonders);
    //     this.afterWonders.forEach((item, index) => this.cp.cloudType(item.name.length, index));
    //
    //     this.socket.syncUpdates('Wonder', this.beforeWonders, (item, index) => {
    //       this.cp.cloudAnimaAfter(this.wonderSky.nativeElement.children[index], this.afterWonders, item, index);
    //     });
    //   });
  }

  saveWonder(wonder: string) {

  }
}
