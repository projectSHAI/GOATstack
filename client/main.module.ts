/*
==============================================================
* Root Module
==============================================================
// Any assets included in this file will be attached
// to the global scope of the application.
*/

/*
--------------------------------------------------
Main component which gets bootstrapped
--------------------------------------------------
//Named AppComponent in compliance with Angular best practices
*/
import { AppComponent }                              from './main-segment/components/app/app.component';

/*
--------------------------------------------------
Modules
--------------------------------------------------
//other necessary modules for this app
*/
import { NgModule, isDevMode }                       from '@angular/core';
import { FormsModule }                               from '@angular/forms';
import { BrowserModule }                             from '@angular/platform-browser';
import { HttpModule, JsonpModule }                   from '@angular/http';
import { MaterialModule }                            from '@angular/material';
import { NgReduxModule, NgRedux, DevToolsExtension } from 'ng2-redux';
import { _NgRedux }                                  from './main-segment/actions/redux.sol';

/*
--------------------------------------------------
Routing
--------------------------------------------------
//enables navigation capabilities capitilizing on the browsers history stack
*/
import { routing }                                   from './routes';

/*
--------------------------------------------------
HTTP Requests
--------------------------------------------------
//imports to handle http events to send and receive data from api's
*/
import { Http, XHRBackend, RequestOptions }          from '@angular/http';
/*
--------------------------------------------------
Components
--------------------------------------------------
//Declare components here
*/
//user created components                
import { HeaderComponent }                           from './main-segment/components/header/header.component';
import { NavbarComponent }                           from './main-segment/components/navbar/navbar.component';
import { SignInOutComponent }                        from './main-segment/components/signinout/signinout.component';
import { HomeComponent }                             from './main-segment/components/home/home.component';
import { FooterComponent }                           from './main-segment/components/footer/footer.component';
import { Four0FourComponent }                        from './main-segment/components/404/four0four.component';
import { UserProfileComponent }                      from './main-segment/components/user-profile/user-profile.component';
import { SkyComponent }                              from './main-segment/components/sky/sky.component';
import { OceanComponent }                            from './main-segment/components/ocean/ocean.component';
import { WhaleComponent }                            from './main-segment/components/whale/whale.component';
import { IslandComponent }                           from './main-segment/components/island/island.component';
import { MountainGoatComponent }                     from './main-segment/components/mountain-goat/mountain-goat.component';
import { CloudGeneratorComponent }                   from './main-segment/components/cloud-generator/cloud-generator.component';
// DO NOT REMOVE: template main.module imports

//Angular and 3rd party components

/*
--------------------------------------------------
Directives
--------------------------------------------------
//Declare directives here
*/
//user created directives
import { ZoomDirective }                             from './main-segment/directives/zoom.directive';
//Angular and 3rd party directives

/*
--------------------------------------------------
Services
--------------------------------------------------
//Declare services that need to be singletons here
*/
//user created services
import { ErrorHandlerActions }                       from './main-segment/actions/error/errorHandler.actions';
import { SEOActions }                                from './main-segment/actions/seo/seo.actions';
import { TimeOfDayActions }                          from './main-segment/actions/time-of-day/time-of-day.actions';
import { SocketService }                             from './main-segment/services/socketio/socketio.service';
import { HttpIntercept }                             from './main-segment/services/auth/auth.service';
import { UserService }                               from './main-segment/services/user/user.service';
import { WonderService }                             from './main-segment/services/wonder/wonder.service';

//Angular and 3rd party serices
import { Cookie }                                    from 'ng2-cookies/ng2-cookies';

/*
--------------------------------------------------
Pipes
--------------------------------------------------
//Declare pipes here
*/
//User created pipes
import { NgForHookPipe }                             from './main-segment/pipes/ngFor-hook.pipe';

//Angular and 3rd party pipes

/*
--------------------------------------------------
Non NPM libraries
--------------------------------------------------
//Declare all custom non npm libraries here
//There are thousands of non NPM javascript libraries, why limit ourselves!!
// ----- Note if possible also include a types definition file.
*/

/*
--------------------------------------------------
Redux Store Interface
--------------------------------------------------
//Declare import for redux store interface
*/
import { IAppState, rootReducer, enhancers }         from './store/index';
import createLogger from 'redux-logger';

/*
--------------------------------------------------
exported functions for AoT
--------------------------------------------------
*/
export function httpFactory(backend: XHRBackend, defaultOptions: RequestOptions) {
  return new HttpIntercept(backend, defaultOptions);
}

/*
--------------------------------------------------
NgModule
--------------------------------------------------
//decorator which packages all resources imported above for the app
//without this decorator Angular cannot use any of those above assets
*/
@NgModule({
  //imports: this object imports helper modules which are children in the module tree
  imports: [
    NgReduxModule.forRoot(),
    MaterialModule.forRoot(),
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
    SignInOutComponent,
    HeaderComponent,
    HomeComponent,
    AppComponent,
    NavbarComponent,
    SkyComponent,
    OceanComponent,
    WhaleComponent,
    IslandComponent,
    MountainGoatComponent,
    CloudGeneratorComponent,
    NgForHookPipe,
    ZoomDirective,
    // DO NOT REMOVE: template declarations
  ],
  //providers: this object imports all necessary services into the module
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    },
    // ng2-rdux AoT workaround solution
    { provide: NgRedux, useClass: _NgRedux },
    /////////////////////////////////////
    ErrorHandlerActions,
    SEOActions,
    TimeOfDayActions,
    SocketService,
    UserService,
    WonderService,
    Cookie,
    { provide: DevToolsExtension, useClass: DevToolsExtension }
  ],
  //bootstrap: identifies which component is supposed to be bootstrapped
  bootstrap: [AppComponent]
})

//by convention the root module is called AppModule as stated in the Angular2 docs
//we call AppModule in main.ts to bootstrap the application which points to the AppComponent defined in @NgModule
export class MainModule {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension) {

    // configure the store here, this is where the enhancers are set
    this.ngRedux.configureStore(rootReducer, {},
      isDevMode() ? [createLogger({ collapsed: true })] : [],
      isDevMode() && devTool.isEnabled() ? [...enhancers, devTool.enhancer()] : [...enhancers]);
  }
}
