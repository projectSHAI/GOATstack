///////////////
//Root module//
///////////////

//main component to bootstrap too
import { AppComponent }  from './components/app/app.component';

import { Http, XHRBackend, RequestOptions } from '@angular/http';

//other necessary modules for this app
import { NgModule }                  from '@angular/core';
import { FormsModule }               from '@angular/forms';
import { BrowserModule }             from '@angular/platform-browser';
import { HttpModule, JsonpModule }   from '@angular/http';

//routing imports
import { routing } from './routes';

//components for different views
import { HeaderComponent }            from './components/header/header.component';
import { NavbarComponent }            from './components/navbar/navbar.component';
import { SignInOutComponent }         from './components/signinout/signinout.component';
import { HomeComponent }              from './components/home/home.component';
import { FooterComponent }            from './components/footer/footer.component';
import { Four0FourComponent }         from './components/404/four0four.component';
import { UserProfileComponent }       from './components/user-profile/user-profile.component';
import { SkyComponent }               from './components/sky/sky.component';
import { MountainRangeComponent }     from './components/mountain-range/mountain-range.component';
import { GOATComponent }              from './components/GOAT/GOAT.component';
import { CloudGeneratorComponent }    from './components/cloud-generator/cloud-generator.component';

//services that need to be singletons
import { ErrorHandlerService }        from './services/errorHandler/errorHandler.service';

//custom pipes
import { NgForHookPipe }              from './pipes/ngFor-hook.pipe';

//services for global use
import { Cookie }                     from 'ng2-cookies/ng2-cookies';
import { MaterialModule }             from '@angular/material';
import { HttpIntercept }              from './services/auth/auth.service';

//declare all custom non npm libraries here
import 'gsap';

//decorator which packages all resources for the app
@NgModule({
  //imports: this object imports helper modules which are children in the module tree
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    JsonpModule,
    routing,
    MaterialModule.forRoot()
  ],
  //declarations: this object imports all child components which are used in this module
  declarations: [
    Four0FourComponent,
    UserProfileComponent,
    FooterComponent,
    SignInOutComponent,
    HeaderComponent,
    HomeComponent,
    AppComponent,
    NavbarComponent,
    SkyComponent,
    MountainRangeComponent,
    GOATComponent,
    CloudGeneratorComponent,
    NgForHookPipe
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
    Cookie,
    ErrorHandlerService
  ],
  //bootstrap: identifies which component is supposed to be bootstrapped
  bootstrap: [AppComponent]
})

//by convention the root module is called AppModule as stated in the Angular2 docs
//we call AppModule in main.ts to bootstrap the application which points to the AppComponent defined in @NgModule
export class AppModule { }
