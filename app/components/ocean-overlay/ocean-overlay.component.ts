import { Component, AfterViewInit, ElementRef } from '@angular/core';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ocean-overlay',
  templateUrl: './ocean-overlay.component.html',
  styleUrls: ['./ocean-overlay.component.scss']
})

export class OceanOverlayComponent implements AfterViewInit {

  @select('timeOfDay') toda$: Observable<any>;

  constructor(private hostRef: ElementRef){ }

  ngAfterViewInit() {
    this.toda$.subscribe(x => {
      this.hostRef.nativeElement.children[0].src = x.get('oceanOverlaySvg');
    });
  }


}
