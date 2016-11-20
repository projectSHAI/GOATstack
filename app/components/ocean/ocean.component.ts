import { Component, OnInit } from '@angular/core';

import { select } from 'ng2-redux';
import{ Observable } from 'rxjs/Observable';

@Component({
  selector: 'the-ocean',
  templateUrl: './ocean.component.html',
  styleUrls: ['./ocean.component.scss']
})

export class OceanComponent implements OnInit{ 

	@select('timeOfDay') toda$: Observable<any>;

	oceanOverlaySvg: string;


	ngOnInit() {
		this.toda$.subscribe(x => {
			this.oceanOverlaySvg = x.get('oceanOverlaySvg');
		});
	}

}
