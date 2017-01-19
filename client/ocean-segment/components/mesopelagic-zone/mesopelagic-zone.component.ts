import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mesopelagic-zone',
  templateUrl: './mesopelagic-zone.component.html',
  styleUrls: ['./mesopelagic-zone.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MesopelagicZoneComponent{ 

	//All the below is defined mutably only because we are certain they will never be changed. Any data which changes should be immutable and handled by the redux store

	//offset variable to let lazyload know when to begin loading assets. in this case, 1080px below the viewport.
	offset: number = 1080;
	//images and styles arrays to set html attributes. This makes the html template more concise, and readable.
	octoBlue: string = 'public/assets/octochibi-blue.svg';
	octoGreen: string = 'public/assets/octochibi-green.svg';
	octoYellow: string = 'public/assets/octochibi-yellow.svg';
	octoPurple: string = 'public/assets/octochibi-purple.svg';
	octoRed: string = 'public/assets/octochibi-red.svg';

	images: Array<string> = [
		this.octoBlue,
		this.octoGreen,
		this.octoYellow,
		this.octoPurple,
		this.octoRed,
		this.octoBlue,
		this.octoGreen,
		this.octoYellow,
		this.octoPurple,
		this.octoBlue,
		this.octoPurple,
		this.octoRed
	];

	styles: Array<string> = [
		'octochibi small',
		'octochibi medium',
		'octochibi small',
		'octochibi medium',
		'octochibi large',
		'octochibi small',
		'octochibi medium',
		'octochibi large',
		'octochibi small',
		'octochibi small',
		'octochibi medium',
		'octochibi small'
	];

}
