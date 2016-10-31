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
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { ErrorHandlerActions } from '../../actions/errorHandler.actions';
import { Observable } from 'rxjs/Observable';

//decorator
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

//class which is implemented once the AfterViewInit event in tha Angular event lifecycle has fired.
//-- to learn more about Angular's event lifecycle read here: https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html
export class AppComponent implements AfterViewInit {
  //this decorator is for NgRedux. you can read more about Redux here: https://github.com/angular-redux/ng2-redux
  @select('error') error$: Observable<any>;

  //this decorator gabs the object associated with the #errorToast template variable assigned in the app.componnent.html file,
  //-- and assigns this object to the class variable errorToast
  @ViewChild('errorToast') errorToast: ElementRef;

  constructor(private errorHandler: ErrorHandlerActions) { }

  ngAfterViewInit() {
    // initialize error handling service
    this.errorHandler.initHandler(this.errorToast.nativeElement.children[0]);
  }

}
