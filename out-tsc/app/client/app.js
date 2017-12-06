"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//The browser platform with a compiler, used for Just in Time loading.
//JIT means Angular compiles the application in the browser and then launches the app
var core_1 = require("@angular/core");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_module_1 = require("./modules/app.module");
core_1.enableProdMode();
// Compile and launch the module
// Compile and launch the module
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
