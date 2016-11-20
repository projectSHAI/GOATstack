import{ Component, OnInit } from '@angular/core';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'blue-whale',
  templateUrl: './whale.component.html',
  styleUrls: ['./whale.component.scss']
})

export class WhaleComponent implements OnInit { 

  @select('timeOfDay') toda$: Observable<any>;

  whaleSvg: string;

  constructor(){ }

  ngOnInit() {
    this.toda$.subscribe(x => {
      this.whaleSvg = x.get('whaleSvg');
    });
    console.log(this.whaleSvg);
  }

}
