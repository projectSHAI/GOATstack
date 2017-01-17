import { PipeTransform, Pipe } from '@angular/core';

import { Observable } from 'rxjs/Observable';

// created as a universal ngFor pipe so get the element when it's made 
// can be used for animation or callbacks
@Pipe({
	name: 'marginPipe',
	pure: false
})

export class MarginPipe implements PipeTransform {

  transform(value: number, el: any): any {
  	console.log('hello');
		return el.offsetHeight;
  }

}