import { NgModule }           from '@angular/core';
import { CommonModule }       from '@angular/common';
import { Four0FourRoutingModule } from './404-routing.module';

import { Four0FourComponent }	  from './404.component';

@NgModule({
	imports: [CommonModule, Four0FourRoutingModule],
	declarations: [Four0FourComponent]
})

export class Four0FourModule {

}