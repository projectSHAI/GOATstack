import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ocean-floor',
  templateUrl: './ocean-floor.component.html',
  styleUrls: ['./ocean-floor.component.css']
})

export class OceanFloorComponent implements OnInit{ 

	@ViewChild('floor') floor: ElementRef;
	@select('zoom') zoom$: Observable<any>;

	lockerMargin: number;

	constructor() {}

	ngOnInit() {
		this.zoom$.subscribe((x) => {
			if(x.get('showHide') === false) {
				this.lockerMargin = this.floor.nativeElement.offsetHeight * 0.4;
			}
		});
		
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.lockerMargin = this.floor.nativeElement.offsetHeight * 0.4;
	}

}
