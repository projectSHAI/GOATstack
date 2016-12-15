//The browser platform with a compiler, used for Just in Time loading.
//JIT means Angular compiles the application in the browser and then launches the app
import { platformBrowser } from '@angular/platform-browser';

//imports the AppModule which is the root module that bootstraps app.component.ts
import { MainModuleNgFactory } from '../ngc-aot/client/main-module/main.module.ngfactory';
import { enableProdMode } from '@angular/core';
enableProdMode();

// Compile and launch the module
platformBrowser().bootstrapModuleFactory(MainModuleNgFactory);
