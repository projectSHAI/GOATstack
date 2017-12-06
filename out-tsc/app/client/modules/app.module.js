"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
/*
-------------------------------------------------------------------
Main component which gets bootstrapped
-------------------------------------------------------------------
** Named AppComponent in compliance with Angular best practices  **
*/
var app_component_1 = require("./app.component");
/*
--------------------------------------------------
Modules
--------------------------------------------------
** other necessary modules for this app
*/
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var redux_module_1 = require("../redux/redux.module");
var animations_1 = require("@angular/platform-browser/animations");
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var angular_material_module_1 = require("./feature-modules/extension-modules/angular-material/angular-material.module");
/*
--------------------------------------------------
Core Module
--------------------------------------------------
** As a rule of thumb we place all angular necessary imports into the app.module
** Any modules/components/services/etc which are third party or built in house will be placed into the Core module
** This allows for better organization and load order with module lazy loading.
*/
var core_module_1 = require("./core-module/core.module");
/*
--------------------------------------------------
NgModule
--------------------------------------------------
** decorator which packages all resources imported above for the app
** without this decorator Angular cannot use any of those above assets
** read more here: https://angular.io/docs/ts/latest/guide/ngmodule.html
*/
//by convention the root module is called AppModule as stated in the Angular2 docs
//we call AppModule in app.ts to bootstrap the application which points to the AppComponent defined in @NgModule
var /*
--------------------------------------------------
NgModule
--------------------------------------------------
** decorator which packages all resources imported above for the app
** without this decorator Angular cannot use any of those above assets
** read more here: https://angular.io/docs/ts/latest/guide/ngmodule.html
*/
//by convention the root module is called AppModule as stated in the Angular2 docs
//we call AppModule in app.ts to bootstrap the application which points to the AppComponent defined in @NgModule
AppModule = /** @class */ (function () {
    function AppModule(platformId, appId) {
        this.platformId = platformId;
        this.appId = appId;
        var platform = common_1.isPlatformBrowser(platformId) ?
            'on the server' : 'in the browser';
        console.log("Running " + platform + " with appId=" + appId);
    }
    return AppModule;
}());
exports.AppModule = AppModule;
