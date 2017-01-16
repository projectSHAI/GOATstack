import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ocean-floor',
  templateUrl: './ocean-floor.component.html',
  styleUrls: ['./ocean-floor.component.css']
})

export class OceanFloorComponent{ 

	@ViewChild('floor') floor: ElementRef;

	lockerMargin: number;
	offset: number = 1080;

	images: Array<string> = [
		'public/assets/ocean-floor.png',
		'public/assets/davy-jones-locker.svg'
	];

	styles: Array<string> = [
		'ocean-floor',
		'davy-jones-locker'
	];

	constructor() {}



}
