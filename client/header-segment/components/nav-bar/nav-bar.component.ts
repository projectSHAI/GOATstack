import { Component, AfterViewInit, Renderer, ViewChild, ElementRef, HostListener } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

declare let TweenMax: any;
declare let TimelineMax: any;

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements AfterViewInit { 

	@ViewChild('menu') m: ElementRef;

	@select('timeOfDay') toda$: Observable<any>;
	menuHide: boolean = true;
	menuOpen: boolean = false;

	linkWidth: number;
	sioWidth: number;
	savedWidth: number;

	private timeline: any;

	constructor(private renderer: Renderer, private el: ElementRef) {}

	ngAfterViewInit() {
		this.linkWidth = this.m.nativeElement.children[0].clientWidth;
		this.sioWidth = this.m.nativeElement.children[1].clientWidth;
		this.checkMenuWidth();

		this.initMenuAnima();
	}

	openMenu() {
		this.menuOpen = !this.menuOpen;
		if (this.menuOpen) {
			this.timeline.play();
		} else {
			this.timeline.reverse();
		}
	}

	@HostListener('window:resize', ['$event'])
	resize(event) {
		this.checkMenuWidth();
	}

	checkMenuWidth(): boolean {
		const width = this.m.nativeElement.clientWidth;

		if (width - this.linkWidth - this.sioWidth < 1 && this.menuHide) {
			this.savedWidth = window.innerWidth + 50;
			return this.menuHide = false;
		} else if (window.innerWidth > this.savedWidth && !this.menuHide) {
			return this.menuHide = true;
		}
	}

	initMenuAnima() {
		// initialize menu handling animation timeline
		this.timeline = new TimelineMax({ paused: true });

		const links = this.m.nativeElement.children[0].children;
		const signinout = this.m.nativeElement.children[1].children[0].children[0].children; 

		this.timeline
		  .to(links[0], 1, { x: -125 })
		  .to(links[1], 1, { x: -125 }, '-=0.8')
		  .to(signinout[0], 1, { x: -125 }, '-=0.8')
		  .to(signinout[1], 1, { x: -125 }, '-=0.8')
	}

}
