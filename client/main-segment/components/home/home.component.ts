import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'home-section',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent { 

	@ViewChild('oceanCapOverlay') oceanCapOverlay: ElementRef;
	@select('timeOfDay') toda$: Observable<any>;
	@select('zoom') zoom$: Observable<any>;

	overlayMargin: string;
	epipelagicCapOverlaySvg: string;
	nightTime: boolean = true;

	ngOnInit() {
		this.toda$.subscribe((x) => {
			if(x.get('nightTime') === true) {
				this.epipelagicCapOverlaySvg = '/public/assets/epipelagic-cap-overlay-night2.svg';
				this.nightTime               = true;
			} else {
				this.epipelagicCapOverlaySvg = '/public/assets/epipelagic-cap-overlay-day.svg';
				this.nightTime               = false;
			}
			
		});

		this.zoom$.subscribe((x) => {
			if(x.get('showHide') === false) {
				this.overlayMargin = this.oceanCapOverlay.nativeElement.offsetHeight + 'px';
			}
		});
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.overlayMargin = this.oceanCapOverlay.nativeElement.offsetHeight + 'px';
	}

}
