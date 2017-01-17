import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'the-ocean',
  templateUrl: './ocean.component.html',
  styleUrls: ['./ocean.component.css']
})

export class OceanComponent{ 

	@ViewChild('capOverlay') capOverlay: ElementRef;
	@select('timeOfDay') toda$: Observable<any>;

	overlayMargin: string;

	constructor(private el:ElementRef) {}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.overlayMargin = this.capOverlay.nativeElement.offsetHeight + 'px';
	}

}
