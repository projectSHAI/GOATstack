import {NgModule}                              from '@angular/core';

import {MatButtonModule, MatCardModule}        from '@angular/material';

let createLogger = require('redux-logger');

@NgModule({
  imports:      [ 
    MatButtonModule,
    MatCardModule
  ],
  exports:      [     
    MatButtonModule,
    MatCardModule
 ]

})
export class AngularMaterialModule {

}