///////////////
//Root module//
///////////////

//main component to bootstrap too
import { AppComponent }  from './components/app/app.component';

import { Http, Request, RequestOptionsArgs, Response, XHRBackend, RequestOptions, ConnectionBackend, Headers } from '@angular/http';

import { Cookie } from 'ng2-cookies/ng2-cookies';

// import { Universal } from './models/universal/universal.model';

//other necessary modules for this app
import { NgModule }                  from '@angular/core';
import { FormsModule }               from '@angular/forms';
import { BrowserModule }             from '@angular/platform-browser';
import { HttpModule, JsonpModule }   from '@angular/http';

//routing imports
import { routing } from './routes';

//components for different views
import { HeaderComponent }      from './components/header/header.component';
import { HomeComponent }        from './components/home/home.component';
import { FooterComponent }      from './components/footer/footer.component';
import { Four0FourComponent }   from './components/404/four0four.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

//services for global use
import { UserService }          from './services/user/user.service';
import { ClockService }         from './services/clock/clock.service';
import { HttpIntercept }        from './services/auth/auth.service';

//decorator which packages all resources for the app
@NgModule({
  //imports: this object imports helper modules which are children in the module tree
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    JsonpModule,
    routing
  ],
  //declarations: this object imports all child components which are used in this module
  declarations: [
    Four0FourComponent,
    UserProfileComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    AppComponent,
  ],
  //providers: this object imports all necessary services into the module
  providers: [
    {
      provide: Http,
      useFactory: (
        backend: XHRBackend,
        defaultOptions: RequestOptions) =>
        new HttpIntercept(backend, defaultOptions),
      deps: [XHRBackend, RequestOptions]
    },
    Cookie
  ],

  //bootstrap: identifies which component is supposed to be bootstrapped
  bootstrap: [AppComponent]
})

//by convention the root module is called AppModule as stated in the Angular2 docs
//we call AppModule in main.ts to bootstrap the application which points to the AppComponent defined in @NgModule
export class AppModule { }
