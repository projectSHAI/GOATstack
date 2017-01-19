import { Component } from '@angular/core';

@Component({
  selector: 'ocean-floor',
  templateUrl: './ocean-floor.component.html',
  styleUrls: ['./ocean-floor.component.css']
})

export class OceanFloorComponent{ 

	//All the below is defined mutably only because we are certain they will never be changed. Any data which changes should be immutable and handled by the redux store

	//offset variable to let lazyload know when to begin loading assets. in this case, 1080px below the viewport.
	offset: number = 1080;
	//images and styles arrays to set html attributes. This makes the html template more concise, and readable.
	images: Array<string> = [
		'public/assets/davy-jones-locker.svg'
	];

	styles: Array<string> = [
		'ocean-floor',
		'davy-jones-locker'
	];

}
