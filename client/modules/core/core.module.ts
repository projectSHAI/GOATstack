import { NgModule }                              from '@angular/core';
import { HttpClientModule, HttpClient }          from '@angular/common/http';
import { SharedModule }                          from '../shared/shared.module';
import { CoreRoutingModule }                     from './core-routing.module';

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
  imports:      [ SharedModule, CoreRoutingModule ],
  declarations: [ CoreComponent, HeaderComponent, FooterComponent ],
  exports:      [ CoreRoutingModule, HttpClientModule, CoreComponent, HeaderComponent, FooterComponent ],
  providers: 	[
    HttpClient,
  	ErrorHandlerActions,
  	SEOActions,

  	Cookie
  ]
})
export class CoreModule {

}