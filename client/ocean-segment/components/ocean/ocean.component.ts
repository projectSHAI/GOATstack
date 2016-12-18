import { Component, OnInit, ElementRef } from '@angular/core';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'the-ocean',
  templateUrl: './ocean.component.html',
  styleUrls: ['./ocean.component.css']
})

export class OceanComponent implements OnInit{ 

	@select('timeOfDay') toda$: Observable<any>;

	oceanOverlaySvg: string;

	constructor(private el:ElementRef) {}

	ngOnInit() {

		this.toda$.subscribe(x => this.oceanOverlaySvg = x.get('oceanOverlaySvg'));

	}

}
