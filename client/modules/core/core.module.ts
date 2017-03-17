import { NgModule }                              from '@angular/core';
import { HttpModule }                            from '@angular/http';
import { SharedModule }                          from '../shared/shared.module';
import { CoreRoutingModule }                     from './core-routing.module';

import { Http, XHRBackend, RequestOptions }      from '@angular/http';

import { CoreComponent }		                     from './core.component';
import { HeaderComponent }                       from './components/header/header.component';
import { FooterComponent }                       from './components/footer/footer.component';

import { ErrorHandlerActions }                   from '../../redux/actions/error/errorHandler.actions';
import { UserFormActions }                       from '../../redux/actions/userForm/userForm.actions';
import { UserActions }                           from '../../redux/actions/user/user.actions';
import { SEOActions }                            from '../../redux/actions/seo/seo.actions';

import { SocketService }                         from './services/socketio/socketio.service';
import { HttpIntercept }                         from './services/auth/auth.service';
import { UserService }                           from './services/user/user.service';

//Angular and 3rd party serices
import { Cookie }                                from 'ng2-cookies/ng2-cookies';

export function httpFactory(backend: XHRBackend, defaultOptions: RequestOptions) {
  return new HttpIntercept(backend, defaultOptions);
}

@NgModule({
  imports:      [ SharedModule, CoreRoutingModule ],
  declarations: [ CoreComponent, HeaderComponent, FooterComponent ],
  exports:      [ CoreRoutingModule, HttpModule, CoreComponent, HeaderComponent, FooterComponent ],
  providers: 	[
  	{
  	  provide: Http,
  	  useFactory: httpFactory,
  	  deps: [XHRBackend, RequestOptions]
  	},
  	ErrorHandlerActions,
  	UserActions,
  	UserFormActions,
  	SEOActions,

    SocketService,
    UserService,

  	Cookie
  ]
})
export class CoreModule {

}