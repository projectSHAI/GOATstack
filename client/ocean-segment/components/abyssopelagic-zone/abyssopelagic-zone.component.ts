import { Component } from '@angular/core';

@Component({
  selector: 'abyssopelagic-zone',
  templateUrl: './abyssopelagic-zone.component.html',
  styleUrls: ['./abyssopelagic-zone.component.css']
})

export class AbyssopelagicZoneComponent{ 

	offset: number = 1080;

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
