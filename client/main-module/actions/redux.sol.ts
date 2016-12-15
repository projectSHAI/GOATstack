import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

// ng2-redux AoT workaround solution!!!
// compiling using the angular compiler-cli causes errors
// with using NgRedux class, and this is a temerary solution
@Injectable()
export class _NgRedux extends NgRedux<any> {
  constructor() {
    super();
  }
}
