//The browser platform with a compiler, used for Just in Time loading.
//JIT means Angular compiles the application in the browser and then launches the app
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// enableProdMode();
//imports the MainModule which is the root module that bootstraps app.component.ts
import { MainModule } from './main-module/main.module';

// Compile and launch the module
platformBrowserDynamic().bootstrapModule(MainModule);
