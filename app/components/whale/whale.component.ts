import{ Component, AfterViewInit, ElementRef } from '@angular/core';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'blue-whale',
  templateUrl: './whale.component.html',
  styleUrls: ['./whale.component.scss']
})

export class WhaleComponent implements AfterViewInit { 

  @select('timeOfDay') toda$: Observable<any>;

  constructor(private hostRef: ElementRef){ }

  ngAfterViewInit() {
    this.toda$.subscribe(x => {
      this.hostRef.nativeElement.children[1].src = x.get('whaleSvg');
    });
  }

}
