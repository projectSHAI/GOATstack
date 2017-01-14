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
	offset: number = 400;

	images: Array<string> = [
		'public/assets/ocean-floor.svg',
		'public/assets/davy-jones-locker.svg'
	];

	styles: Array<string> = [
		'ocean-floor',
		'davy-jones-locker'
	];

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
