//The browser platform with a compiler, used for Just in Time loading.
//JIT means Angular compiles the application in the browser and then launches the app
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './modules/app.module';
enableProdMode();
// Compile and launch the module
platformBrowserDynamic().bootstrapModule(AppModule);
