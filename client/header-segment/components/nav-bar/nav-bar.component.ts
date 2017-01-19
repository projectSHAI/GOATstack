import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
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

  	@select('user') user$: Observable<any>;
	@select('timeOfDay') toda$: Observable<any>;
	menuHide: boolean = false;
	menuOpen: boolean = false;

	linkWidth: number;
	sioWidth: number;
	savedWidth: number;

	private timeline: any;

	constructor(private el: ElementRef) {}

	ngAfterViewInit() {
		// this.linkWidth = this.m.nativeElement.children[0].clientWidth;
		// this.sioWidth = this.m.nativeElement.children[1].clientWidth;
		// this.checkMenuWidth();

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
		const signinout = this.m.nativeElement.children[1].children[0].children; 

		this.timeline		  
		  .to(this.m.nativeElement.children[0], 0, { display: 'block' })
		  .to(this.m.nativeElement.children[1].children[0], 0, { display: 'inherit' })
		  .to(links[0], 0, { x: 150 })
		  .to(links[1], 0, { x: 150 })
		  .to(signinout[2], 0, { x: 150 })
		  .to(signinout[0], 0, { x: 150 })
		  .to(signinout[1], 0, { x: 150 })
		  .to(links[0], 0.6, { x: 0 })
		  .to(links[1], 0.6, { x: 0 }, '-=0.4')
		  .to(signinout[2], 0.6, { x: 0 }, '-=0.4')
		  .to(signinout[0], 0.6, { x: 0 }, '-=0.6')
		  .to(signinout[1], 0.6, { x: 0 }, '-=0.4')
	}


	@HostListener('window:resize', ['$event'])
	resize(event) {
		// this.checkMenuWidth();
	}

	@HostListener('document:click', ['$event'])
	body(event) {
		let clicked = event.target;
		let inside = false;
		do {
		    if (clicked === this.m.nativeElement || clicked === this.el.nativeElement.children[2]) {
		        inside = true;
		    }
		    clicked = clicked.parentNode;
		} while (clicked);
		if(inside){

		}else{
		    if (this.menuOpen) {
		    	this.menuOpen = false;
		    	this.timeline.reverse();
		    }
		}
	}

	@HostListener('window:click', ['$event'])
	menu(event) {
		let clicked = event.target;
		let inside = false;
		do {
		    if (clicked === this.m.nativeElement) {
		        inside = true;
		    }
		    clicked = clicked.parentNode;
		} while (clicked);
		if(inside){
	       this.menuOpen = false;
	       this.timeline.reverse();
		}
	}

}
