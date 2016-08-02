import { provideRouter, RouterConfig }  from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { Four0FourComponent } from './components/404/four0four.component';
import { HomeComponent } from './components/home/home.component';

const routes: RouterConfig = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent
  },
  {
  	path: '**',
  	component: Four0FourComponent
  }
];

export const appRouterProviders = [
  provideRouter(routes)
];