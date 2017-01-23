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
import { AppComponent }                              from './app.component';
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
import { MaterialModule }                            from '@angular/material';
import { NgReduxModule, NgRedux, DevToolsExtension } from 'ng2-redux';

import { CoreModule }                                from './core/core.module';
import { HomeModule }                                from './home/home.module';
import { UserProfileModule }                         from './user-profile/user-profile.module';
import { Four0FourModule }                           from './404/404.module';


/*
--------------------------------------------------
Routing
--------------------------------------------------
//enables navigation capabilities capitilizing on the browsers history stack
*/

/*
--------------------------------------------------
HTTP Requests
--------------------------------------------------
//imports to handle http events to send and receive data from api's
*/
/*
--------------------------------------------------
Components
--------------------------------------------------
//Declare components here
*/
//user created components                

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

/*
--------------------------------------------------
Pipes
--------------------------------------------------
//Declare pipes here
*/
//User created pipes

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
    FormsModule,
    CoreModule,
    HomeModule,
    UserProfileModule,
    Four0FourModule,

    NgReduxModule,
    MaterialModule.forRoot()
  ],
  //declarations: this object imports all child components which are used in this module
  declarations: [
    AppComponent,
    // DO NOT REMOVE: template declarations
  ],
  //providers: this object imports all necessary services into the module
  providers: [
    { provide: DevToolsExtension, useClass: DevToolsExtension }
  ],
  //bootstrap: identifies which component is supposed to be bootstrapped
  bootstrap: [AppComponent]
})

//by convention the root module is called AppModule as stated in the Angular2 docs
//we call AppModule in main.ts to bootstrap the application which points to the AppComponent defined in @NgModule
export class AppModule {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension) {

    // configure the store here, this is where the enhancers are set
    this.ngRedux.configureStore(rootReducer, {},
      isDevMode() ? [createLogger({ collapsed: true })] : [],
      isDevMode() && devTool.isEnabled() ? [...enhancers, devTool.enhancer()] : [...enhancers]);
  }
}