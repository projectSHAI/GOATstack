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
import { BrowserModule }                             from '@angular/platform-browser';
import { MaterialModule }                            from '@angular/material';

import { CoreModule }                                from './modules/core/core.module';
import { HomeModule }                                from './modules/home/home.module';
import { UserProfileModule }                         from './modules/user-profile/user-profile.module';
import { Four0FourModule }                           from './modules/404/404.module';

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
    CoreModule,
    HomeModule,
    UserProfileModule,
    Four0FourModule,
    MaterialModule.forRoot()
  ],
  //declarations: this object imports all child components which are used in this module
  declarations: [
    AppComponent,
    // DO NOT REMOVE: template declarations
  ],
  //bootstrap: identifies which component is supposed to be bootstrapped
  bootstrap: [AppComponent]
})

//by convention the root module is called AppModule as stated in the Angular2 docs
//we call AppModule in main.ts to bootstrap the application which points to the AppComponent defined in @NgModule
export class AppModule {

}