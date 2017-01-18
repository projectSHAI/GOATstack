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
import { Component, ViewChild, OnInit, AfterViewInit, ElementRef, Renderer } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { ErrorHandlerActions } from '../../actions/error/errorHandler.actions';
import { UserFormActions } from '../../actions/userForm/userForm.actions';
import { UserActions } from '../../actions/user/user.actions';
import { SEOActions } from '../../actions/seo/seo.actions';
import { Observable } from 'rxjs/Observable';

declare let TweenMax: any;
declare let TimelineMax: any;

//decorator
@Component({
  selector: 'my-app',
  providers: [UserActions, UserFormActions],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//class which is implemented once the AfterViewInit event in tha Angular event lifecycle has fired.
//-- to learn more about Angular's event lifecycle read here: https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html
export class AppComponent {
  //this decorator is for NgRedux. you can read more about Redux here: https://github.com/angular-redux/ng2-redux
  @select('error') error$: Observable<any>;
  @select('timeOfDay') toda$: Observable<any>;
  @select('userForm') userForm$: Observable<any>;

  private errorTimeline: any;
  private formTimeline: any;
  private formTimeline2: any;

  //this decorator gabs the object associated with the #errorToast template variable assigned in the app.componnent.html file,
  //-- and assigns this object to the class variable errorToast
  @ViewChild('errorToast') errorToast: ElementRef;
  @ViewChild('formToast') formToast: ElementRef;

  constructor(
    private errorHandler: ErrorHandlerActions,
    private userFormActions: UserFormActions,
    private userActions: UserActions,
    private el: ElementRef,
    private renderer: Renderer
    ) {}

  ngOnInit() {
    // Initially chamge theme reflecting time of day
    this.toda$.subscribe( x => this.el.nativeElement.className = x.get('time'));
  }

  ngAfterViewInit() {
    this.formTimeline = new TimelineMax({ paused: true });
    this.formTimeline
      .to(this.formToast.nativeElement.children[0], 0, {display: 'block'})
      .to(this.formToast.nativeElement.children[0], 1, {opacity: 1});

    this.formTimeline2 = new TimelineMax({ paused: true });
    this.formTimeline2
      .to(this.formToast.nativeElement.children[1], 0, {display: 'block'})
      .to(this.formToast.nativeElement.children[1], 1, {opacity: 1});

    this.userForm$.subscribe(uf => {
      uf.get('userSigning') ? this.formTimeline.play(): this.formTimeline.reverse();
      uf.get('userSignup') ? this.formTimeline2.play(): this.formTimeline2.reverse();
    });


    // initialize error handling animation timeline
    this.errorTimeline = new TimelineMax({ paused: true });
    this.errorTimeline
      .to(this.errorToast.nativeElement, 0, { display: 'block' })
      .to(this.errorToast.nativeElement, 1, { opacity: 1 })
      .to(this.errorToast.nativeElement, 1, { opacity: 0 }, "+=3")
      .to(this.errorToast.nativeElement, 1, { display: 'none' })
      .add(() => this.errorHandler.hideError());

    // Let the component be in charge of triggering the animation
    this.error$.subscribe(error => error.get('message') ? this.errorTimeline.play(0) : null);
  }

}
