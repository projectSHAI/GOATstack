import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'the-ocean',
  templateUrl: './ocean.component.html',
  styleUrls: ['./ocean.component.css']
})

export class OceanComponent implements OnInit{ 

	@ViewChild('capOverlay') capOverlay: ElementRef;
	@select('timeOfDay') toda$: Observable<any>;

	overlayMargin: string;
	epipelagicCapOverlaySvg: string;
	oceanOverlaySvg: string;
	nightTime: boolean = true;

	constructor(private el:ElementRef) {}

	ngOnInit() {
		this.toda$.subscribe((x) => {
			
			this.oceanOverlaySvg = x.get('oceanOverlaySvg')

			if(x.get('nightTime') === true) {
				this.epipelagicCapOverlaySvg = 'public/assets/epipelagic-cap-overlay-night.svg';
				this.nightTime               = true;
			} else {
				this.epipelagicCapOverlaySvg = 'public/assets/epipelagic-cap-overlay-day.svg';
				this.nightTime               = false;
			}
			
		});

	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.overlayMargin = this.capOverlay.nativeElement.offsetHeight + 'px';
	}

}
