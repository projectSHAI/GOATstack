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
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

//decorator
@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

//class which is implemented once the AfterViewInit event in tha Angular event lifecycle has fired.
//-- to learn more about Angular's event lifecycle read here: https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html
export class AppComponent {
  //this decorator is for NgRedux. you can read more about Redux here: https://github.com/angular-redux/ng2-redux
  @select('timeOfDay') toda$: Observable<any>;

}
