import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';

import './styles.scss';
import './loader.scss';

//The browser platform with a compiler, used for Just in Time loading.
//JIT means Angular compiles the application in the browser and then launches the app
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
//imports the AppModule which is the root module that bootstraps app.component.ts
import { AppModule } from './modules/app.module';

if (process.env.ENV === 'production') {
  enableProdMode();
}

// Compile and launch the module
platformBrowserDynamic().bootstrapModule(AppModule);
