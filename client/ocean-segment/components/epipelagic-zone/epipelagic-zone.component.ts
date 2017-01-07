import { Component, OnInit, ElementRef } from '@angular/core';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'epipelagic-zone',
  templateUrl: './epipelagic-zone.component.html',
  styleUrls: ['./epipelagic-zone.component.css']
})

export class EpipelagicZoneComponent implements OnInit{ 

	@select('timeOfDay') toda$: Observable<any>;

	oceanOverlaySvg: string;

	constructor(private el:ElementRef) {}

	ngOnInit() {

		this.toda$.subscribe(x => this.oceanOverlaySvg = x.get('oceanOverlaySvg'));

	}

}
