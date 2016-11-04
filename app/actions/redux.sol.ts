import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

// ng2-redux AoT workaround solution!!!
@Injectable()
export class _NgRedux extends NgRedux<any> {
  constructor() {
    super();
  }
}
