import { Component, OnInit } from '@angular/core';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { WonderActions } from '../../actions/wonder/wonder.actions';
import { ZoomActions } from '../../actions/zoom/zoom.actions';
import { ZoomDirective } from '../../directives/zoom.directive';

@Component({
  selector: 'the-island',
  providers: [WonderActions],
  templateUrl: './island.component.html',
  styleUrls: ['./island.component.scss']
})

export class IslandComponent implements OnInit {

  @select('timeOfDay') toda$: Observable<any>;
  @select('zoom') zoom$: Observable<any>;

  dream: string;
  islandSvg: string;
  showInput: boolean;

  constructor(
    public wonderActions: WonderActions,
    public zoomActions: ZoomActions,
    public zoomDirective: ZoomDirective
    ){ }

  ngOnInit() {
    this.toda$.subscribe(x => this.islandSvg = x.get('islandSvg'));
    this.zoom$.subscribe(x => this.showInput = x.get('showHide'));
  }

}
