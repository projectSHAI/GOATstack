import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bathypelagic-zone',
  templateUrl: './bathypelagic-zone.component.html',
  styleUrls: ['./bathypelagic-zone.component.css']
})

export class BathypelagicZoneComponent implements OnInit{ 

	offset: number = 1080;

	images: Array<string> = [
		'public/assets/squid2-pink.svg',
		'public/assets/squid2-purple.svg',
		'public/assets/squid2-red.svg',
		'public/assets/squid3-blue.svg',
		'public/assets/squid3-orange.svg',
		'public/assets/jellyfish-blue.svg',
		'public/assets/jellyfish-blue.svg',
		'public/assets/jellyfish-orange.svg',
		'public/assets/jellyfish-orange.svg',
		'public/assets/jellyfish-purple.svg',
		'public/assets/jellyfish-purple.svg'
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

	constructor() { }
	ngOnInit() { }

}
