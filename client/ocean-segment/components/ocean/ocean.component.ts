import { Component } from '@angular/core';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'the-ocean',
  templateUrl: './ocean.component.html',
  styleUrls: ['./ocean.component.css']
})

export class OceanComponent{ 
	//this ng2-redux store item is used in the html template with the async pipe
	@select('timeOfDay') toda$: Observable<any>;

}
