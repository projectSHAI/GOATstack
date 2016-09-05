import { Routes, RouterModule }   from '@angular/router';
import { ModuleWithProviders }   from '@angular/core';

import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { Four0FourComponent } from './components/404/four0four.component';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
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

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);