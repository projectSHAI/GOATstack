/*
=========================================================================================================
Bootstrapping component
=========================================================================================================
//According to Angular best practices the App component should be used for bootstrapping the application.
//This component gets bootstrapped through app.module.ts, the magic occurs in the @NgModule decorater's bootstrap property,
//we set that value to the AppComponent class defined in this component
//then the app.module.ts gets invoked in the main.ts bootstrap method.
*/


//main imports
import { Component, ViewChild, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { ErrorHandlerActions } from '../../actions/error/errorHandler.actions';
import { SEOActions } from '../../actions/seo/seo.actions';
import { Observable } from 'rxjs/Observable';

declare let TweenMax: any;
declare let TimelineMax: any;

//decorator
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

//class which is implemented once the AfterViewInit event in tha Angular event lifecycle has fired.
//-- to learn more about Angular's event lifecycle read here: https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html
export class AppComponent implements OnInit, AfterViewInit {
  //this decorator is for NgRedux. you can read more about Redux here: https://github.com/angular-redux/ng2-redux
  @select('error') error$: Observable<any>;
  @select('timeOfDay') toda$: Observable<any>;

  private timeline: any;

  //this decorator gabs the object associated with the #errorToast template variable assigned in the app.componnent.html file,
  //-- and assigns this object to the class variable errorToast
  @ViewChild('errorToast') errorToast: ElementRef;

  constructor(
    private errorHandler: ErrorHandlerActions,
    private ele: ElementRef
    ) {}

  ngOnInit() {
    // Initially chamge theme reflecting time of day
    this.toda$.subscribe( x => this.ele.nativeElement.className = x.get('nightTime') ? 'night-time' : 'day-time');
  }

  ngAfterViewInit() {
    // initialize error handling animation timeline
    this.timeline = new TimelineMax({ paused: true });

    this.timeline.to(this.errorToast.nativeElement.children[0], 1, { opacity: 1 })
      .to(this.errorToast.nativeElement.children[0], 1, { opacity: 0 }, "+=3")
      .add(() => this.errorHandler.hideError());

    // Let the component be in charge of triggering the animation
    this.error$.subscribe(error => error.get('message') ? this.timeline.play(0) : null);
  }

}
