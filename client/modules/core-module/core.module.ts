import {NgModule}                              from '@angular/core';

import {SharedModule}                          from '../shared/shared.module';
import {CoreRoutingModule}                     from './core-routing.module';
import {HomeModule}                            from '../home/home.module';
import {UserProfileModule}                     from '../user-profile/user-profile.module';
import {Four0FourModule}                       from '../404/404.module';
import {AngularMaterialModule}                 from '../angular-material/angular-material.module';

import {CoreComponent}		                     from './core.component';
import {HeaderComponent}                       from './components/header/header.component';
import {FooterComponent}                       from './components/footer/footer.component';

import {ErrorHandlerActions}                   from '../../redux/actions/error/errorHandler.actions';
import {SEOActions}                            from '../../redux/actions/seo/seo.actions';

//Angular and 3rd party serices
import {Cookie}                                from 'ng2-cookies/ng2-cookies';

import {IAppState, rootReducer, enhancers}     from '../../redux/store/index';

let createLogger = require('redux-logger');

@NgModule({
  imports:      [ 
    SharedModule, 
    CoreRoutingModule, 
    HomeModule, 
    UserProfileModule, 
    Four0FourModule,
    AngularMaterialModule
  ],
  declarations: [ 
    CoreComponent, 
    HeaderComponent, 
    FooterComponent 
  ],
  exports:      [ 
    CoreRoutingModule,
    CoreComponent, 
    HeaderComponent, 
    FooterComponent
  ],
  providers: 	[
  	ErrorHandlerActions,
  	SEOActions,
  	Cookie
  ]
})
export class CoreModule {

}