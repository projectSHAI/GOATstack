import { Component, OnInit } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'header-section',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
	@select('timeOfDay') toda$: Observable<any>;

	titleColor: string;

	ngOnInit() {
		this.toda$.subscribe(x => this.titleColor = x.get('titleColor'));
	}

}
