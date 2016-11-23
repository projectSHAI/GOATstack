import{ Component, OnInit } from '@angular/core';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { SkyPositionActions } from '../../actions/sky-position/sky-position.actions';

@Component({
  selector: 'blue-whale',
  providers: [SkyPositionActions],
  templateUrl: './whale.component.html',
  styleUrls: ['./whale.component.scss']
})

export class WhaleComponent implements OnInit { 

  @select('timeOfDay') toda$: Observable<any>;

  whaleSvg: string;

  constructor(private skyPositionActions: SkyPositionActions){ }

  ngOnInit() {
    this.toda$.subscribe(x => this.whaleSvg = x.get('whaleSvg'));
  }

}
