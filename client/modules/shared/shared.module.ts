import { NgModule }                                  from '@angular/core';
import { MaterialModule }                            from '@angular/material';
import { CommonModule }                              from '@angular/common';
import { FormsModule }                               from '@angular/forms';
import { LazyLoadImageModule }                       from 'ng2-lazyload-image';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [  ],
  exports:      [
  	CommonModule, 
  	FormsModule, 
  	LazyLoadImageModule, 
  	MaterialModule 
  ]
})
export class SharedModule {
	
}