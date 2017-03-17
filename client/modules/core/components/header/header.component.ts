import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { UserActions }  from '../../../../redux/actions/user/user.actions';
import { UserFormActions } from '../../../../redux/actions/userForm/userForm.actions';

declare let TweenMax: any;
declare let TimelineMax: any;
declare let Power0: any;

@Component({
  selector: 'header-section',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnInit, AfterViewInit {
	
	@ViewChild('menu') m: ElementRef;

  	@select('user') user$: Observable<any>;
  	@select('userForm') userForm$: Observable<any>;
	menuHide: boolean = true;
	menuOpen: boolean = false;

	linkWidth: number;
	buttonWidth: number;
	bQuant: number;
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
		this.linkWidth = this.m.nativeElement.clientWidth;
		this.buttonWidth = this.m.nativeElement.children[0].children[0].clientWidth;
		this.bQuant = this.m.nativeElement.children[0].children.length - 1;
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
		this.ref.markForCheck();
	}

	checkMenuWidth(): void {
		this.linkWidth = this.m.nativeElement.clientWidth;

		if (this.linkWidth - ((this.buttonWidth * this.bQuant) + (4 * this.bQuant)) < 1 && this.menuHide) {
			this.savedWidth = window.innerWidth + 50;
			this.menuHide = false;

			this.ref.markForCheck();
		} else if (window.innerWidth > this.savedWidth && !this.menuHide) {
			this.menuHide = true;
			console.log('BIG');

			this.ref.markForCheck();
		}
	}

	initMenuAnima() {
		// initialize menu handling animation timeline
		this.timeline = new TimelineMax({ paused: true });

		const links = this.m.nativeElement.children[0].children; 

		this.timeline
		  .to(this.m.nativeElement.children[0], 0, { ease: Power0.easeNone, css: { className:'+=show' } })
		  .to(links[0], 0, { x: 150 })
		  .to(links[1], 0, { x: 150 })
		  .to(links[4], 0, { x: 150 })
		  .to(links[2], 0, { x: 150 })
		  .to(links[3], 0, { x: 150 })
		  .to(links[0], 0.5, { x: 0 })
		  .to(links[1], 0.5, { x: 0 }, '-=0.3')
		  .to(links[4], 0.5, { x: 0 }, '-=0.3')
		  .to(links[2], 0.5, { x: 0 }, '-=0.5')
		  .to(links[3], 0.5, { x: 0 }, '-=0.3');
	}


	@HostListener('window:resize', ['$event'])
	resize(event) {
		this.checkMenuWidth();
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
		    if (this.menuOpen && !this.menuHide) this.openMenu();
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
	       if (this.menuOpen && !this.menuHide) this.openMenu();
		}
	}
}
