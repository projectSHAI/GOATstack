import {NgModule}                              from '@angular/core';

import {SharedModule}                          from '../shared/shared.module';
import {CoreRoutingModule}                     from './core-routing.module';
import {HomeModule}                            from '../home/home.module';
import {UserProfileModule}                     from '../user-profile/user-profile.module';
import {Four0FourModule}                       from '../404/404.module';

import {CoreComponent}		                     from './core.component';
import {HeaderComponent}                       from './components/header/header.component';
import {FooterComponent}                       from './components/footer/footer.component';

import {ErrorHandlerActions}                   from '../../redux/actions/error/errorHandler.actions';
import {SEOActions}                            from '../../redux/actions/seo/seo.actions';

//Angular and 3rd party serices
import {Cookie}                                from 'ng2-cookies/ng2-cookies';

import {IAppState, rootReducer, enhancers}     from '../../redux/store/index';
import {MatButtonModule, MatCardModule}        from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
let createLogger = require('redux-logger');

@NgModule({
  imports:      [ 
    SharedModule, 
    CoreRoutingModule, 
    HomeModule, 
    UserProfileModule, 
    Four0FourModule,
    
    MatButtonModule,
    MatCardModule,
    MatToolbarModule
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
    FooterComponent,
    
    MatButtonModule,
    MatCardModule,
    MatToolbarModule ],
  providers: 	[
  	ErrorHandlerActions,
  	SEOActions,
  	Cookie
  ]
})
export class CoreModule {

}