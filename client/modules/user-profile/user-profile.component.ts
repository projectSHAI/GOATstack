import { Component, ChangeDetectionStrategy } from '@angular/core';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'user-profile',
  template: require('./user-profile.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserProfileComponent {

  @select('user') user$: Observable<any>;

}
