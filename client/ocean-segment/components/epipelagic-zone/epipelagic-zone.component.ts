import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'epipelagic-zone',
  templateUrl: './epipelagic-zone.component.html',
  styleUrls: ['./epipelagic-zone.component.css']
})

export class EpipelagicZoneComponent implements OnInit{ 

	@ViewChild('oceanCap') oceanCap: ElementRef;
	@select('timeOfDay') toda$: Observable<any>;
	@select('zoom') zoom$: Observable<any>;

	overlayMargin: string;
	epipelagicCapOverlaySvg: string;
	epipelagicColor: string = 'rgba(19,15,39,0.4)';;

	constructor(private el:ElementRef) {}

	ngOnInit() {

		this.toda$.subscribe((x) => {
			if(x.get('nightTime') === true) {
				this.epipelagicCapOverlaySvg = '/public/assets/epipelagic-cap-overlay-night.svg';
				this.epipelagicColor         = 'rgba(19,15,39,0.7)';
			} else {
				this.epipelagicCapOverlaySvg = '/public/assets/epipelagic-cap-overlay-day.svg';
				this.epipelagicColor         = 'rgba(19,135,193,0.4)';
			}
			
		});

		this.zoom$.subscribe((x) => {
			if(x.get('showHide') === false) {
				this.overlayMargin = this.oceanCap.nativeElement.offsetHeight + 'px';
			}
		});

	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.overlayMargin = this.oceanCap.nativeElement.offsetHeight + 'px';
	}

}
