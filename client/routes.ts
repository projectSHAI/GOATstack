//import all the necessary modules
import { Routes, RouterModule }   from '@angular/router';
import { ModuleWithProviders }   from '@angular/core';

//import all components which will be useed as views
import { UserProfileComponent } from './main-segment/components/user-profile/user-profile.component';
import { Four0FourComponent } from './main-segment/components/404/four0four.component';
import { HomeComponent } from './main-segment/components/home/home.component';

//this is the json object which stores all the data the router uses to determine which component to show in the view based on which href the client uses to query the app
export const appRoutes: Routes = [
    {
        //path: the relative href queried by the client
        path: '',
        //component: the component which will be loaded into the view when the above path is queried by the client
        component: HomeComponent
        // You can add a data object with 'title', 'description', 'keywords', etc... for static seo
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

//routing is exported so we can usee it in app.module.ts where we will add a configured Router module to our root NgModule imports
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);