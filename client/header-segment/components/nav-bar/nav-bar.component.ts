import { Component, AfterViewInit, Renderer, ViewChild, ElementRef, HostListener } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements AfterViewInit { 

	@ViewChild('menu') m: ElementRef;

	@select('timeOfDay') toda$: Observable<any>;
	menuHide: boolean = false;
	menuOpen: boolean = false;

	constructor(private renderer: Renderer, private el: ElementRef) {}

	ngAfterViewInit() {
		this.checkMenuWidth();
	}

	openMenu() {
		this.menuOpen = !this.menuOpen;
	}

	@HostListener('window:resize', ['$event'])
	resize(event) {
		this.checkMenuWidth();
	}

	checkMenuWidth() {
		const width = this.m.nativeElement.clientWidth;
		const child1w = this.m.nativeElement.children[0].clientWidth;
		const child2w = this.m.nativeElement.children[1].clientWidth;

		if (width - child1w - child2w < 1 && this.menuHide) {
			this.menuHide = false;
		} else if (width - child1w - child2w > 1 && !this.menuHide) {
			this.menuHide = true;
		}
	}

}
