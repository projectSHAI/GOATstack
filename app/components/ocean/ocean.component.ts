import { Component, OnInit, ElementRef } from '@angular/core';

import { select } from 'ng2-redux';
import{ Observable } from 'rxjs/Observable';

@Component({
  selector: 'the-ocean',
  templateUrl: './ocean.component.html',
  styleUrls: ['./ocean.component.scss']
})

export class OceanComponent implements OnInit{ 

	@select('timeOfDay') toda$: Observable<any>;
  	@select('skyPosition') skyPosition$: Observable<any>;

	oceanOverlaySvg: string;

	constructor(private el:ElementRef) {}

	ngOnInit() {

		this.toda$.subscribe(x => this.oceanOverlaySvg = x.get('oceanOverlaySvg'));

    	this.skyPosition$.subscribe(x => {

    		if(x.get('toSkyIsland') === true) {

    			this.el.nativeElement.style.top = '200vh';

    		}
    		else{

    			this.el.nativeElement.style.top = 0;

    		}
    
		});
	}

}
