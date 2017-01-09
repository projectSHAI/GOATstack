import { Component, OnInit, ElementRef } from '@angular/core';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { WonderActions } from '../../../sky-segment/actions/wonder/wonder.actions';
import { ZoomActions } from '../../../main-segment/actions/zoom/zoom.actions';
import { ZoomDirective } from '../../../main-segment/directives/zoom.directive';

@Component({
  selector: 'the-island',
  providers: [WonderActions],
  templateUrl: './island.component.html',
  styleUrls: ['./island.component.css']
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
    public zoomDirective: ZoomDirective,
    public el: ElementRef,
    ){ }

  ngOnInit() {
    this.toda$.subscribe(x => this.islandSvg = x.get('islandSvg'));
    this.zoom$.subscribe(x => {
      this.showInput = x.get('showHide');
      if(this.showInput === true) {
        this.el.nativeElement.style.pointerEvents = 'all';
      }
      else {
        this.el.nativeElement.style.pointerEvents = 'none';
      }

    });
  }

}
