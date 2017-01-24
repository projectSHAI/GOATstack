import { NgModule }                                  from '@angular/core';
import { MaterialModule }                            from '@angular/material';
import { CommonModule }                              from '@angular/common';
import { FormsModule }                               from '@angular/forms';
import { LazyLoadImageModule }                       from 'ng2-lazyload-image';

import { MarginPipe }		                             from './pipes/margin.pipe';
import { NgForHookPipe }	                           from './pipes/ngFor-hook.pipe';

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
  ]
})
export class SharedModule { }