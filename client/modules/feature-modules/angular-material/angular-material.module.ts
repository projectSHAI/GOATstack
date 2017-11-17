import {NgModule} from '@angular/core';

import {
  MatButtonModule, 
  MatCardModule,
  MatIconModule,
  MatSidenavModule
} from '@angular/material';

let createLogger = require('redux-logger');

@NgModule({
  imports:      [ 
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule
  ],
  exports:      [     
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule
 ]

})
export class AngularMaterialModule {

}