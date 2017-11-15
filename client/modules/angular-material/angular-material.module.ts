import {NgModule} from '@angular/core';

import {
  MatButtonModule, 
  MatCardModule,
  MatMenuModule,
  MatIconModule
} from '@angular/material';

let createLogger = require('redux-logger');

@NgModule({
  imports:      [ 
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule
  ],
  exports:      [     
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule
 ]

})
export class AngularMaterialModule {

}