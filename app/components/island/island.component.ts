import { Component, ElementRef, AfterViewInit } from '@angular/core';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { WonderActions } from '../../actions/wonder/wonder.actions';

@Component({
  selector: 'the-island',
  providers: [WonderActions],
  templateUrl: './island.component.html',
  styleUrls: ['./island.component.scss']
})

export class IslandComponent implements AfterViewInit {

  @select('timeOfDay') toda$: Observable<any>;

  dream: string;

  constructor(private hostRef: ElementRef, public wonderActions: WonderActions){ }

  ngAfterViewInit() {
    this.toda$.subscribe(x => {
      this.hostRef.nativeElement.children[0].src = x.get('oceanFrontSvg');
    });
  }

}
