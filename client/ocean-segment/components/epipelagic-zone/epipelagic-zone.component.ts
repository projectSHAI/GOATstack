import { Component } from '@angular/core';

@Component({
  selector: 'epipelagic-zone',
  templateUrl: './epipelagic-zone.component.html',
  styleUrls: ['./epipelagic-zone.component.css']
})

export class EpipelagicZoneComponent { 

	offset:number = 1080;

	images1: Array<string> = [
		'public/assets/fish1.svg',
		'public/assets/fish1.svg',
		'public/assets/fish1.svg',
		'public/assets/fish1.svg'
	];
	images2: Array<string> = [
		'public/assets/fish2.svg',
		'public/assets/fish2.svg',
		'public/assets/fish2.svg',
		'public/assets/fish2.svg'
	];
	images3: Array<string> = [
		'public/assets/seaturtle.svg',
		'public/assets/shark.svg'
	];

	styles1: Array<string> = [
		'fish1 large',
		'fish1 small',
		'fish1 small',
		'fish1 small'
	];
	styles2: Array<string> = [
		'fish2 large',
		'fish2 small',
		'fish2 small',
		'fish2 small'
	];
	styles3: Array<string> = [
		'turtle',
		'shark'
	];
}
