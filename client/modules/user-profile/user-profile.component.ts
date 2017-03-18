import { Component, ChangeDetectionStrategy } from '@angular/core';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserProfileComponent {

  @select('user') user$: Observable<any>;

}
