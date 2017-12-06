"use strict";
/*
=================================================================================================================================
-- Bootstrapping component ------------------------------------------------------------------------------------------------------
=================================================================================================================================
** According to Angular best practices the App component should be used for bootstrapping the application.                     **
** This component gets bootstrapped through app.module.ts, the magic occurs in the @NgModule decorater's bootstrap property,   **
** we set that value to the AppComponent class defined in this component                                                       **
** then the app.module.ts gets invoked in the main.ts bootstrap method.                                                        **
=================================================================================================================================
*/
Object.defineProperty(exports, "__esModule", { value: true });
// Main imports
var core_1 = require("@angular/core");
var store_1 = require("@angular-redux/store");
var Observable_1 = require("rxjs/Observable");
// Hammer used for gesture support like touch
require("hammerjs");
//decorator
//the main app component which will act as the parent component to all other components in the app.
var 
//decorator
//the main app component which will act as the parent component to all other components in the app.
AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
exports.AppComponent = AppComponent;
