//The browser platform with a compiler, used for Just in Time loading.
//JIT means Angular compiles the application in the browser and then launches the app
import { platformBrowser } from '@angular/platform-browser';

//imports the AppModule which is the root module that bootstraps app.component.ts
import { AppModuleNgFactory } from '../ngc-aot/client/modules/app.module.ngfactory';
import { enableProdMode } from '@angular/core';
enableProdMode();

// Compile and launch the module
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
