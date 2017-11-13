import { NgModule }                              from '@angular/core';
import { SharedModule }                          from '../shared/shared.module';
import { CoreRoutingModule }                     from './core-routing.module';

import { HomeModule }                            from '../home/home.module';
import { UserProfileModule }                     from '../user-profile/user-profile.module';
import { Four0FourModule }                       from '../404/404.module';

import { HttpClientModule, HttpClient, HttpInterceptor, HTTP_INTERCEPTORS }           from '@angular/common/http';

import { XHRBackend, RequestOptions }            from '@angular/http';

import { CoreComponent }		                     from './core.component';
import { HeaderComponent }                       from './components/header/header.component';
import { FooterComponent }                       from './components/footer/footer.component';

import { ErrorHandlerActions }                   from '../../redux/actions/error/errorHandler.actions';
import { UserFormActions }                       from '../../redux/actions/userForm/userForm.actions';
import { UserActions }                           from '../../redux/actions/user/user.actions';
import { SEOActions }                            from '../../redux/actions/seo/seo.actions';

import { SocketService }                         from './services/socketio/socketio.service';
import { TokenInterceptor }                      from './services/auth/token-interceptor.service';
import { AuthService }                           from './services/auth/auth.service';

//Angular and 3rd party serices
import { Cookie }                                from 'ng2-cookies/ng2-cookies';

@NgModule({
  imports:      [ 
		SharedModule, 
		CoreRoutingModule,
		HomeModule,
    UserProfileModule,
    Four0FourModule, ],
  declarations: [ CoreComponent, HeaderComponent, FooterComponent ],
  exports:      [ CoreRoutingModule, HttpClientModule, CoreComponent, HeaderComponent, FooterComponent ],
  providers: 	[
  	{
  	  provide: HTTP_INTERCEPTORS,
  	  useClass: TokenInterceptor,
  	  multi: true
		},
		HttpClient,
  	ErrorHandlerActions,
  	UserActions,
  	UserFormActions,
  	SEOActions,

    SocketService,
    AuthService,

  	Cookie
  ]
})
export class CoreModule {

}