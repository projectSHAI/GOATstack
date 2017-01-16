import { Component, OnInit } from '@angular/core';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'the-island',
  templateUrl: './island.component.html',
  styleUrls: ['./island.component.css']
})

export class IslandComponent implements OnInit {

  @select('timeOfDay') toda$: Observable<any>;

  islandSvg: string;

  ngOnInit() {
    this.toda$.subscribe(x => this.islandSvg = x.get('islandSvg'));
  }

}
