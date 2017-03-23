import { NgModule, isDevMode }                       from '@angular/core';
import { CommonModule }                              from '@angular/common';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';

import { IAppState, rootReducer, enhancers }         from './store/index';
import { createLogger }                              from 'redux-logger';

@NgModule({
  imports: [ CommonModule, NgReduxModule ],
  providers: [   
    { provide: DevToolsExtension, useClass: DevToolsExtension }
  ]
})
export class ReduxModule {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension) {

    // configure the store here, this is where the enhancers are set
    this.ngRedux.configureStore(rootReducer, {},
      isDevMode() ? [createLogger({ collapsed: true })] : [],
      isDevMode() && devTool.isEnabled() ? [...enhancers, devTool.enhancer()] : [...enhancers]);
  }
}