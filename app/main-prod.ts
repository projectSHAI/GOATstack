import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from '../ngc-aot/app/app.module.ngfactory';
import { enableProdMode } from '@angular/core';
enableProdMode();

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
