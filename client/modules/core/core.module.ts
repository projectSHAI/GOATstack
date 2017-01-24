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
import { TimeOfDayActions }                      from '../../redux/actions/time-of-day/time-of-day.actions';
import { UserFormActions }                       from '../../redux/actions/userForm/userForm.actions';
import { UserActions }                           from '../../redux/actions/user/user.actions';
import { CloudActions }                          from '../../redux/actions/cloud/cloud.actions';
import { SEOActions }                            from '../../redux/actions/seo/seo.actions';

import { SocketService }                         from './services/socketio/socketio.service';
import { HttpIntercept }                         from './services/auth/auth.service';
import { UserService }                           from './services/user/user.service';
import { WonderService }                         from './services/wonder/wonder.service';

//Angular and 3rd party serices
import { Cookie }                                from 'ng2-cookies/ng2-cookies';

import { IAppState, rootReducer, enhancers }     from '../../redux/store/index';
let createLogger = require('redux-logger');

export function httpFactory(backend: XHRBackend, defaultOptions: RequestOptions) {
  return new HttpIntercept(backend, defaultOptions);
}

@NgModule({
  imports:      [ SharedModule, CoreRoutingModule, NgReduxModule ],
  declarations: [ CoreComponent, HeaderComponent, FooterComponent ],
  exports:      [ CoreRoutingModule, HttpModule, CoreComponent, HeaderComponent, FooterComponent ],
  providers: 	[
  	{
  	  provide: Http,
  	  useFactory: httpFactory,
  	  deps: [XHRBackend, RequestOptions]
  	},
  	ErrorHandlerActions,
    CloudActions,
    TimeOfDayActions,
  	UserActions,
  	UserFormActions,
  	SEOActions,

    SocketService,
    UserService,
    WonderService,

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