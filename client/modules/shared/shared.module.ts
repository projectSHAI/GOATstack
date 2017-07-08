import { NgModule }                                  from '@angular/core';
import { CommonModule }                              from '@angular/common';
import { FormsModule }                               from '@angular/forms';
import { LazyLoadImageModule }                       from 'ng2-lazyload-image';

import { 
	MdButtonModule, 
	MdInputModule, 
	MdCardModule,
	MdToolbarModule
} from '@angular/material';

@NgModule({
  imports:      [ CommonModule ],
  exports:      [
  	CommonModule, 
  	FormsModule, 
  	LazyLoadImageModule, 
  	MdButtonModule, 
  	MdInputModule,
  	MdCardModule,
  	MdToolbarModule
  ]
})
export class SharedModule { }