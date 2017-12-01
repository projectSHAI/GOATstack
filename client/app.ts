//The browser platform with a compiler, used for Just in Time loading.
//JIT means Angular compiles the application in the browser and then launches the app
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './modules/app.module';
import {enableProdMode} from '@angular/core';

if (process.env.ENV === 'production') {
  enableProdMode();
}

// Compile and launch the module
platformBrowserDynamic().bootstrapModule(AppModule);
