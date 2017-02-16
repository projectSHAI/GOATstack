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
import { NgModule }                                  from '@angular/core';
import { BrowserModule }                             from '@angular/platform-browser';
import { MaterialModule }                            from '@angular/material';
import { ReduxModule }                               from './redux/redux.module';
import { AngularFireModule }                         from 'angularfire2';

import { CoreModule }                                from './modules/core/core.module';
import { HomeModule }                                from './modules/home/home.module';
import { UserProfileModule }                         from './modules/user-profile/user-profile.module';
import { Four0FourModule }                           from './modules/404/404.module';

/*
--------------------------------------------------
firebase config
--------------------------------------------------
** This is the configuration json which lets
** the client know where your firebase data is
**  located, and more.
*/
export const firebaseConfig = {
    apiKey: "AIzaSyCrqC3-w7UriZhEARFmh7SQw3TMG2CRksY",
    authDomain: "goatstack-66d6f.firebaseapp.com",
    databaseURL: "https://goatstack-66d6f.firebaseio.com",
    storageBucket: "goatstack-66d6f.appspot.com",
    messagingSenderId: "555297893377"
};

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
    HomeModule,
    UserProfileModule,
    Four0FourModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  //declarations: this object imports all child components which are used in this module
  declarations: [ AppComponent ],
  //bootstrap: identifies which component is supposed to be bootstrapped
  bootstrap: [ AppComponent ]
})

//by convention the root module is called AppModule as stated in the Angular2 docs
//we call AppModule in app.ts to bootstrap the application which points to the AppComponent defined in @NgModule
export class AppModule {

}