import { Component, OnInit, ElementRef } from '@angular/core';

import { select } from 'ng2-redux';
import{ Observable } from 'rxjs/Observable';

@Component({
  selector: 'the-sky',
  templateUrl: './sky.component.html',
  styleUrls: ['./sky.component.scss']
})

export class SkyComponent {

  @select('timeOfDay') toda$: Observable<any>;
  @select('skyPosition') skyPosition$: Observable<any>;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    
    this.toda$.subscribe(x => this.el.nativeElement.style.background = x.get('skyColor'));
    this.skyPosition$.subscribe(x => {
    	if(x.get('toSkyIsland') === true) {
    		this.el.nativeElement.style.top = 0;
    	}
    	else{
    		this.el.nativeElement.style.top = '-200vh';
    	}
    });

  }

}
