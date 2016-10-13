/// <reference path="../../node_modules/@types/node/index.d.ts" />

//The browser platform with a compiler, used for Just in Time loading.
//JIT means Angular compiles the application in the browser and then launches the app
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

//imports the AppModule which is the root module that bootstraps app.component.ts
import { AppModule } from './app.module';

// Compile and launch the module
platformBrowserDynamic().bootstrapModule(AppModule);
