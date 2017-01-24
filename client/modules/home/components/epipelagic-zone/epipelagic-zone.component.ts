import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'epipelagic-zone',
  templateUrl: './epipelagic-zone.component.html',
  styleUrls: ['./epipelagic-zone.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EpipelagicZoneComponent { 

	//All the below is defined mutably only because we are certain they will never be changed. Any data which changes should be immutable and handled by the redux store

	//offset variable to let lazyload know when to begin loading assets. in this case, 1080px below the viewport.
	offset: number = 1080;
	//images and styles arrays to set html attributes. This makes the html template more concise, and readable.

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
