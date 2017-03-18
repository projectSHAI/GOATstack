/*
=================================================================================================================================
-- Bootstrapping component ------------------------------------------------------------------------------------------------------
=================================================================================================================================
** According to Angular best practices the App component should be used for bootstrapping the application.                     **
** This component gets bootstrapped through app.module.ts, the magic occurs in the @NgModule decorater's bootstrap property,   **
** we set that value to the AppComponent class defined in this component                                                       **
** then the app.module.ts gets invoked in the main.ts bootstrap method.                                                        **
=================================================================================================================================
*/


//main imports
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

//decorator
@Component({
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

//the main app component which will act as the parent component to all other components in the app.
export class AppComponent {
  //the @select() decorator is from NgRedux.
  //GOATstack embraces the immutible paradigm, and has a redux store which contains the applications state which can be found in root/client/redux
  //you can read more about Redux here: https://github.com/angular-redux/ng2-redux

}
