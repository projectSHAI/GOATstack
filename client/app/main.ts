import { bootstrap }    from '@angular/platform-browser-dynamic';

import { AppComponent } from './components/app/app.component';

import { appRouterProviders } from './routes';

bootstrap(AppComponent, [
  appRouterProviders
])
.catch(err => console.error(err));
