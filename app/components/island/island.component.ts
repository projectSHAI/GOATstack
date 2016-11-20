import { Component, OnInit } from '@angular/core';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { WonderActions } from '../../actions/wonder/wonder.actions';

@Component({
  selector: 'the-island',
  providers: [WonderActions],
  templateUrl: './island.component.html',
  styleUrls: ['./island.component.scss']
})

export class IslandComponent implements OnInit {

  @select('timeOfDay') toda$: Observable<any>;

  dream: string;
  islandSvg: string;

  constructor(public wonderActions: WonderActions){ }

  ngOnInit() {
    this.toda$.subscribe(x => {
      this.islandSvg = x.get('islandSvg');
    });
  }

}
