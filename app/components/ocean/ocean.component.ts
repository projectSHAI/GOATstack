import { Component, OnInit, ElementRef } from '@angular/core';

import { select } from 'ng2-redux';
import{ Observable } from 'rxjs/Observable';

@Component({
  selector: 'the-ocean',
  templateUrl: './ocean.component.html',
  styleUrls: ['./ocean.component.scss']
})

export class OceanComponent implements OnInit {

  @select('timeOfDay') toda$: Observable<any>;

  constructor(private hostRef: ElementRef){ }

  ngOnInit() {
    this.toda$.subscribe(x => {
      this.hostRef.nativeElement.children[0].get('oceanBrightness');
      this.hostRef.nativeElement.children[2].get('oceanFrontBrightness');
    });
  }


}
