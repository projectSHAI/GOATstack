import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bathypelagic-zone',
  templateUrl: './bathypelagic-zone.component.html',
  styleUrls: ['./bathypelagic-zone.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BathypelagicZoneComponent{ 

	//All the below is defined mutably only because we are certain they will never be changed. Any data which changes should be immutable and handled by the redux store

	//offset variable to let lazyload know when to begin loading assets. in this case, 1080px below the viewport.
	offset: number = 1080;
	//images and styles arrays to set html attributes. This makes the html template more concise, and readable.
	images: Array<string> = [
		'public/assets/squid2-pink.svg',
		'public/assets/squid2-purple.svg',
		'public/assets/squid2-red.svg',
		'public/assets/squid3-blue.svg',
		'public/assets/squid3-orange.svg',
		'public/assets/jellyfish-blue.png',
		'public/assets/jellyfish-blue.png',
		'public/assets/jellyfish-orange.png',
		'public/assets/jellyfish-orange.png',
		'public/assets/jellyfish-purple.png',
		'public/assets/jellyfish-purple.png'
	];

	styles: Array<string> = [
		'squid small-squid',
		'squid medium-squid',
		'squid large-squid',
		'squid small-squid',
		'squid medium-squid',
		'jellyfish small-jelly',
		'jellyfish medium-jelly',
		'jellyfish large-jelly',
		'jellyfish small-jelly',
		'jellyfish medium-jelly',
		'jellyfish large-jelly',
	];

}
