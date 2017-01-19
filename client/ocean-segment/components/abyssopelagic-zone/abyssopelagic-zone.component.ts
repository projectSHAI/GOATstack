import { Component } from '@angular/core';

@Component({
  selector: 'abyssopelagic-zone',
  templateUrl: './abyssopelagic-zone.component.html',
  styleUrls: ['./abyssopelagic-zone.component.css']
})

export class AbyssopelagicZoneComponent{ 

	//All the below is defined mutably only because we are certain they will never be changed. Any data which changes should be immutable and handled by the redux store

	//offset variable to let lazyload know when to begin loading assets. in this case, 1080px below the viewport.
	offset: number = 1080;
	//images and styles arrays to set html attributes. This makes the html template more concise, and readable.
	images: Array<string> = [
		'public/assets/jellyfish-blue.png',
		'public/assets/jellyfish-orange.png',
		'public/assets/jellyfish-purple.png',
		'public/assets/angler.png'
	];

	styles: Array<string> = [
		'jellyfish small-jelly',
		'jellyfish medium-jelly',
		'jellyfish large-jelly',
		'angler'
	];

}
