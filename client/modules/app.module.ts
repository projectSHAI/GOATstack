/*
==================================================================================
-- Root Module -------------------------------------------------------------------
==================================================================================
** Any assets included in this file will be attached                            **
** to the global scope of the application.                                      **
**                                                                              **
** The Root Module has two main purposes                                        **
** 1) It tells Angular about all the apps dependencies                          **
**    so Angular can build the application tree                                 **
** 2) It tells Angular how to bootstrap the app                                 **
**                                                                              **
** Find out more here: https://angular.io/docs/ts/latest/guide/appmodule.html   **
----------------------------------------------------------------------------------
*/

/*
-------------------------------------------------------------------
Main component which gets bootstrapped
-------------------------------------------------------------------
** Named AppComponent in compliance with Angular best practices  **
*/
import { AppComponent }                              from './app.component';

/*
--------------------------------------------------
Modules
--------------------------------------------------
** other necessary modules for this app
*/
import {NgModule}                                  from '@angular/core';
import {BrowserModule}                             from '@angular/platform-browser';
import {ReduxModule}                               from '../redux/redux.module';
import {BrowserAnimationsModule}                   from '@angular/platform-browser/animations';
import {HttpClientModule, HttpClient}              from '@angular/common/http';
import {MatButtonModule, MatCardModule, MatToolbarModule}        from '@angular/material';

/*
--------------------------------------------------
Core Module
--------------------------------------------------
** As a rule of thumb we place all angular necessary imports into the app.module
** Any modules/components/services/etc which are third party or built in house will be placed into the Core module
** This allows for better organization and load order with module lazy loading.
*/
import {CoreModule}                                from './core/core.module';

/*
--------------------------------------------------
NgModule
--------------------------------------------------
** decorator which packages all resources imported above for the app
** without this decorator Angular cannot use any of those above assets
** read more here: https://angular.io/docs/ts/latest/guide/ngmodule.html
*/
@NgModule({
  //imports: this object imports helper modules which are children in the module tree
  imports: [
    BrowserModule,
    ReduxModule,
    CoreModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule

  ],
  //declarations: this object imports all child components which are used in this module
  declarations: [ 
    AppComponent
   ],
  providers: [
    HttpClient
  ],
  //bootstrap: identifies which component is supposed to be bootstrapped
  bootstrap: [ 
    AppComponent
   ]
})

//by convention the root module is called AppModule as stated in the Angular2 docs
//we call AppModule in app.ts to bootstrap the application which points to the AppComponent defined in @NgModule
export class AppModule {

}