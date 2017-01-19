import { Component, ChangeDetectionStrategy } from '@angular/core';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'the-island',
  templateUrl: './island.component.html',
  styleUrls: ['./island.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class IslandComponent {
  //decorator used to declare the time of day store item for use in the HTML template
  @select('timeOfDay') toda$: Observable<any>;

}
