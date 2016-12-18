import { Component, OnInit } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit { 
	@select('timeOfDay') toda$: Observable<any>;

	titleColor: string;

	ngOnInit() {
		this.toda$.subscribe(x => this.titleColor = x.get('titleColor'));
	}

}
