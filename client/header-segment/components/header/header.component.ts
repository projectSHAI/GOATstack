import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

import { UserActions }  from '../../../main-segment/actions/user/user.actions';
import { UserFormActions } from '../../../main-segment/actions/userForm/userForm.actions';

declare let TweenMax: any;
declare let TimelineMax: any;
declare let Power0: any;

@Component({
  selector: 'header-section',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent {
	
	@ViewChild('menu') m: ElementRef;

  	@select('user') user$: Observable<any>;
  	@select('userForm') userForm$: Observable<any>;
	@select('timeOfDay') toda$: Observable<any>;
	menuHide: boolean = false;
	menuOpen: boolean = false;

	linkWidth: number;
	sioWidth: number;
	savedWidth: number;

	private timeline: any;

	constructor(
		private el: ElementRef,
		public userActions: UserActions,
		public userFormActions: UserFormActions,
    	private ref: ChangeDetectorRef
		) {}

	ngOnInit() {		
	    this.userActions.getMe();
	}

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
		this.ref.markForCheck();
	}

	checkMenuWidth(): void {
		const width = this.m.nativeElement.clientWidth;

		if (width - this.linkWidth - this.sioWidth < 1 && this.menuHide) {
			this.savedWidth = window.innerWidth + 50;
			this.menuHide = false;

			this.ref.markForCheck();
		} else if (window.innerWidth > this.savedWidth && !this.menuHide) {
			this.menuHide = true;

			this.ref.markForCheck();
		}
	}

	initMenuAnima() {
		// initialize menu handling animation timeline
		this.timeline = new TimelineMax({ paused: true });

		const links = this.m.nativeElement.children[0].children; 

		this.timeline		  
		  .to(this.m.nativeElement.children[0], 0, { ease: Power0.easeNone, display: 'block' })
		  .fromTo(links[0], 0.5, { x: 150 }, { x: 0 })
		  .fromTo(links[1], 0.5, { x: 150 }, { x: 0 }, '-=0.3')
		  .fromTo(links[4], 0.5, { x: 150 }, { x: 0 }, '-=0.3')
		  .fromTo(links[2], 0.5, { x: 150 }, { x: 0 }, '-=0.5')
		  .fromTo(links[3], 0.5, { x: 150 }, { x: 0 }, '-=0.3')
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
		    	this.openMenu();
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
	       this.openMenu();
		}
	}
}
