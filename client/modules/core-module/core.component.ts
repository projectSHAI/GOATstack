import { Component, ViewChild, AfterViewInit, ElementRef, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { ErrorHandlerActions } from '../../redux/actions/error/errorHandler.actions';
import { SEOActions } from '../../redux/actions/seo/seo.actions';
import { Observable } from 'rxjs/Observable';

declare let TweenMax: any;
declare let TimelineMax: any;
declare let Power0: any;

@Component({
	selector: 'core-section',
	templateUrl: 'core.component.html',
	styleUrls: ['core.component.css'],
  	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoreComponent implements AfterViewInit {
	//this decorator is for NgRedux. you can read more about Redux here: https://github.com/angular-redux/ng2-redux
	@select('error') error$: Observable<any>;
	@select('userForm') userForm$: Observable<any>;

	userSigning: boolean = false;
	userSignup: boolean = false;

	private errorTimeline: any;
	private formTimeline: any;
	private formTimeline2: any;

	private manuContainer: ElementRef;

	//this decorator gabs the object associated with the #errorToast template variable assigned in the app.componnent.html file,
	//-- and assigns this object to the class variable errorToast
	@ViewChild('errorToast') errorToast: ElementRef;

	constructor(
	  private errorHandler: ErrorHandlerActions,
	  private el: ElementRef,
	  private ref: ChangeDetectorRef
	  ) {}

	ngAfterViewInit() {
	  this.manuContainer = this.el.nativeElement.parentElement.children[0].children[0].children[1];

	  // initialize error handling animation timeline
	  this.errorTimeline = new TimelineMax({ paused: true });
	  this.errorTimeline
	    .to(this.errorToast.nativeElement, 0, {display:'block',y:400})
	    .to(this.errorToast.nativeElement, 1, {y:0})
	    .to(this.errorToast.nativeElement, 1, {y:400, display:'none'}, "+=3")
	    .add(() => this.errorHandler.hideError());

	  // Let the component be in charge of triggering the animation
	  this.error$.subscribe((error) => error.get('message') ? this.errorTimeline.play(0) : null);
	}
}