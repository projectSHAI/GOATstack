import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mesopelagic-zone',
  templateUrl: './mesopelagic-zone.component.html',
  styleUrls: ['./mesopelagic-zone.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class MesopelagicZoneComponent{ 

	octoBlue: string = 'public/assets/octochibi-blue.svg';
	octoGreen: string = 'public/assets/octochibi-green.svg';
	octoYellow: string = 'public/assets/octochibi-yellow.svg';
	octoPurple: string = 'public/assets/octochibi-purple.svg';
	octoRed: string = 'public/assets/octochibi-red.svg';
	offset: number = 1080;

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
