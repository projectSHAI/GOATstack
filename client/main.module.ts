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
require('./styles');
require('./loader');

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
import { LazyLoadImageModule }                       from 'ng2-lazyload-image';


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
import { HeaderComponent }                           from './header-segment/components/header/header.component';
import { NavBarComponent }                           from './header-segment/components/nav-bar/nav-bar.component';
import { SignInOutComponent }                        from './header-segment/components/sign-in-out/sign-in-out.component';
import { HomeComponent }                             from './main-segment/components/home/home.component';
import { Four0FourComponent }                        from './main-segment/components/404/four0four.component';
import { UserProfileComponent }                      from './main-segment/components/user-profile/user-profile.component';
import { OceanComponent }                            from './ocean-segment/components/ocean/ocean.component';
import { AbyssopelagicZoneComponent }                from './ocean-segment/components/abyssopelagic-zone/abyssopelagic-zone.component';
import { BathypelagicZoneComponent }                 from './ocean-segment/components/bathypelagic-zone/bathypelagic-zone.component';
import { EpipelagicZoneComponent }                   from './ocean-segment/components/epipelagic-zone/epipelagic-zone.component';
import { MesopelagicZoneComponent }                  from './ocean-segment/components/mesopelagic-zone/mesopelagic-zone.component';
import { OceanFloorComponent }                       from './ocean-segment/components/ocean-floor/ocean-floor.component';
import { WhaleComponent }                            from './whale-segment/components/whale/whale.component';
import { IslandComponent }                           from './whale-segment/components/island/island.component';
import { MountainGoatComponent }                     from './whale-segment/components/mountain-goat/mountain-goat.component';
import { SkyComponent }                              from './sky-segment/components/sky/sky.component';
import { CloudGeneratorComponent }                   from './sky-segment/components/cloud-generator/cloud-generator.component';
import { FooterComponent }                           from './footer-segment/components/footer/footer.component';
// DO NOT REMOVE: template main.module imports

//Angular and 3rd party components

/*
--------------------------------------------------
Directives
--------------------------------------------------
//Declare directives here
*/
//user created directives
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
import { WonderService }                             from './sky-segment/services/wonder/wonder.service';

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
import { MarginPipe }                                from './main-segment/pipes/margin.pipe';

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
let createLogger = require('redux-logger');

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
    BrowserModule,
    LazyLoadImageModule,
    HttpModule,
    FormsModule,
    JsonpModule,
    NgReduxModule,
    MaterialModule.forRoot(),
    routing
  ],
  //declarations: this object imports all child components which are used in this module
  declarations: [
    AppComponent,
    HeaderComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    SkyComponent,
    CloudGeneratorComponent,
    IslandComponent,
    MountainGoatComponent, 
    WhaleComponent,
    OceanComponent,
    SignInOutComponent, 
    AbyssopelagicZoneComponent,
    BathypelagicZoneComponent,
    EpipelagicZoneComponent,
    MesopelagicZoneComponent,
    OceanFloorComponent,
    Four0FourComponent,
    UserProfileComponent,
    NgForHookPipe,
    MarginPipe,
    // DO NOT REMOVE: template declarations
  ],
  //providers: this object imports all necessary services into the module
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    },
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