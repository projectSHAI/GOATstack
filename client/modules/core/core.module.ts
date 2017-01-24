import { NgModule, isDevMode }                   from '@angular/core';
import { HttpModule, JsonpModule }               from '@angular/http';
import { NgReduxModule, NgRedux, DevToolsExtension } from 'ng2-redux';
import { SharedModule }                          from '../shared/shared.module';
import { CoreRoutingModule }                     from './core-routing.module';

import { Http, XHRBackend, RequestOptions }      from '@angular/http';

import { CoreComponent }		                     from './core.component';
import { HeaderComponent }                       from './components/header/header.component';
import { FooterComponent }                       from './components/footer/footer.component';

import { ErrorHandlerActions }                   from '../../redux/actions/error/errorHandler.actions';
import { SEOActions }                            from '../../redux/actions/seo/seo.actions';

//Angular and 3rd party serices
import { Cookie }                                from 'ng2-cookies/ng2-cookies';

import { IAppState, rootReducer, enhancers }     from '../../redux/store/index';
let createLogger = require('redux-logger');

@NgModule({
  imports:      [ SharedModule, CoreRoutingModule, NgReduxModule ],
  declarations: [ CoreComponent, HeaderComponent, FooterComponent ],
  exports:      [ CoreRoutingModule, HttpModule, CoreComponent, HeaderComponent, FooterComponent ],
  providers: 	[
    Http,
  	ErrorHandlerActions,
  	SEOActions,

  	Cookie,    
    { provide: DevToolsExtension, useClass: DevToolsExtension }
  ]
})
export class CoreModule {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension) {

    // configure the store here, this is where the enhancers are set
    this.ngRedux.configureStore(rootReducer, {},
      isDevMode() ? [createLogger({ collapsed: true })] : [],
      isDevMode() && devTool.isEnabled() ? [...enhancers, devTool.enhancer()] : [...enhancers]);
  }
}