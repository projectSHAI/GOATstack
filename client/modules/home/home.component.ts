import { Component, HostListener, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'home-section',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements OnInit {

	posts: FirebaseListObservable<any[]>;
	
	constructor(af: AngularFire) {
	  this.posts = af.database.list('/posts');
	}


	ngOnInit() {
		this.posts.subscribe(x => console.log(x););
	}

}
