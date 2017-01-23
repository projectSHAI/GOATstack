import { NgModule }            from '@angular/core';
import { MaterialModule }                            from '@angular/material';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';
import { LazyLoadImageModule } from 'ng2-lazyload-image';

import { MarginPipe }		   from './pipes/margin.pipe';
import { NgForHookPipe }	   from './pipes/ngFor-hook.pipe';

import { ErrorHandlerActions }                   from '../actions/error/errorHandler.actions';
import { TimeOfDayActions }                      from '../actions/time-of-day/time-of-day.actions';
import { UserFormActions }                       from '../actions/userForm/userForm.actions';
import { UserActions }                           from '../actions/user/user.actions';
import { CloudActions }                          from '../actions/cloud/cloud.actions';
import { SEOActions }                            from '../actions/seo/seo.actions';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ MarginPipe, NgForHookPipe ],
  exports:      [ 
  	MarginPipe, 
  	NgForHookPipe, 
  	CommonModule, 
  	FormsModule, 
  	LazyLoadImageModule, 
  	MaterialModule 
  ],
  providers: [
    // ErrorHandlerActions,
    // TimeOfDayActions,
    // UserActions,
    // UserFormActions,
    // SEOActions,
  ]
})
export class SharedModule { }