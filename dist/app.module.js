///////////////
//Root module//
///////////////
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//main component to bootstrap too
var app_component_1 = require('./components/app/app.component');
//other necessary modules for this app
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var platform_browser_1 = require('@angular/platform-browser');
//routing imports
var routes_1 = require('./routes');
//components for different views
var header_component_1 = require('./components/header/header.component');
var home_component_1 = require('./components/home/home.component');
var footer_component_1 = require('./components/footer/footer.component');
var four0four_component_1 = require('./components/404/four0four.component');
var user_profile_component_1 = require('./components/user-profile/user-profile.component');
//decorator which packages all resources for the app
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            //imports: this object imports helper modules which are children in the module tree
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                routes_1.routing
            ],
            //declarations: this object imports all child components which are used in this module
            declarations: [
                app_component_1.AppComponent,
                header_component_1.HeaderComponent,
                home_component_1.HomeComponent,
                footer_component_1.FooterComponent,
                four0four_component_1.Four0FourComponent,
                user_profile_component_1.UserProfileComponent
            ],
            //providers: this object imports all necessary services into the module
            providers: [
                routes_1.appRoutingProviders
            ],
            //bootstrap: identifies which component is supposed to be bootstrapped
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
