import {ModuleWithProviders, NgModule, Optional, SkipSelf}           from '@angular/core';

import {SharedModule}                          from '../shared-module/shared.module';
import {CoreRoutingModule}                     from './core-routing.module';
import {HomeModule}                            from '../feature-modules/view-modules/home/home.module';
import {UserProfileModule}                     from '../feature-modules/view-modules/user-profile/user-profile.module';
import {Four0FourModule}                       from '../feature-modules/view-modules/404/404.module';
import {AngularMaterialModule}                 from '../feature-modules/extension-modules/angular-material/angular-material.module';

import {CoreComponent}		                     from './core.component';
import {HeaderComponent}                       from './components/header/header.component';
import {FooterComponent}                       from './components/footer/footer.component';

import {ErrorHandlerActions}                   from '../../redux/actions/error/errorHandler.actions';
import {SEOActions}                            from '../../redux/actions/seo/seo.actions';

//3rd party imports
import {Cookie}                                from 'ng2-cookies/ng2-cookies';

import {IAppState, rootReducer, enhancers}     from '../../redux/store/index';


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
    AngularMaterialModule
  ],
  providers: 	[
  	ErrorHandlerActions,
  	SEOActions,
  	Cookie
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Do not lazyLoad this module');
    }
  }

}