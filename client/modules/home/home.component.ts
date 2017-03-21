import { Component, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'home-section',
  template: require('./home.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent {

  constructor() { }

}
