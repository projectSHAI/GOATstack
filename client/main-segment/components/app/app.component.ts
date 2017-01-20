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
import { Component, ViewChild, AfterViewInit, ElementRef, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { ErrorHandlerActions } from '../../actions/error/errorHandler.actions';
import { UserFormActions } from '../../actions/userForm/userForm.actions';
import { UserActions } from '../../actions/user/user.actions';
import { SEOActions } from '../../actions/seo/seo.actions';
import { Observable } from 'rxjs/Observable';

declare let TweenMax: any;
declare let TimelineMax: any;
declare let Power0: any;

//decorator
@Component({
  selector: 'my-app',
  providers: [UserActions, UserFormActions],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

//class which is implemented once the AfterViewInit event in tha Angular event lifecycle has fired.
//-- to learn more about Angular's event lifecycle read here: https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html
export class AppComponent {
  //this decorator is for NgRedux. you can read more about Redux here: https://github.com/angular-redux/ng2-redux
  @select('error') error$: Observable<any>;
  @select('timeOfDay') toda$: Observable<any>;
  @select('userForm') userForm$: Observable<any>;

  userSigning: boolean = false;
  userSignup: boolean = false;

  private errorTimeline: any;
  private formTimeline: any;
  private formTimeline2: any;

  private menuView: ElementRef;

  //this decorator gabs the object associated with the #errorToast template variable assigned in the app.componnent.html file,
  //-- and assigns this object to the class variable errorToast
  @ViewChild('errorToast') errorToast: ElementRef;
  @ViewChild('formToast') formToast: ElementRef;

  constructor(
    private errorHandler: ErrorHandlerActions,
    public userFormActions: UserFormActions,
    public userActions: UserActions,
    private el: ElementRef,
    private ref: ChangeDetectorRef
    ) {}

  ngAfterViewInit() {
    this.menuView = this.el.nativeElement.children[0].children[0].children[0].children[1];

    // Signin and Signup form timelines
    this.formTimeline = new TimelineMax({ paused: true });
    this.formTimeline
      .to(this.formToast.nativeElement.children[0], 0, {ease: Power0.easeNone, display: 'block'})
      .fromTo(this.formToast.nativeElement.children[0], 1, {y:-500}, {y: 0});

    this.formTimeline2 = new TimelineMax({ paused: true });
    this.formTimeline2
      .to(this.formToast.nativeElement.children[1], 0, {ease: Power0.easeNone, display: 'block'})
      .fromTo(this.formToast.nativeElement.children[1], 1, {y:-500}, {y: 0});

    this.userForm$.subscribe(uf => {
      this.userSigning = uf.get('userSigning');
      this.userSignup = uf.get('userSignup');
      uf.get('userSigning') ? this.formTimeline.play(): this.formTimeline.reverse();
      uf.get('userSignup') ? this.formTimeline2.play(): this.formTimeline2.reverse();
    });


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

  @HostListener('document:click', ['$event'])
  body(event) {
    let clicked = event.target;
    let inside = false;
    do {
        if (clicked === this.formToast.nativeElement || clicked == this.menuView) {
            inside = true;
        }
        clicked = clicked.parentNode;
    } while (clicked);
    if(inside){

    }else{
      if (this.userSigning) 
        this.userFormActions.loginForm(false);
      if (this.userSignup)
        this.userFormActions.registerForm(false);
    }
  }

}
