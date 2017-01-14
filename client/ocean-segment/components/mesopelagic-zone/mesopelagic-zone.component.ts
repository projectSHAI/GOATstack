import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mesopelagic-zone',
  templateUrl: './mesopelagic-zone.component.html',
  styleUrls: ['./mesopelagic-zone.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})

export class MesopelagicZoneComponent implements OnInit{ 

	octoBlue: string = 'public/assets/octo-chibi-blue.svg';
	octoGreen: string = 'public/assets/octo-chibi-green.svg';
	octoOrange: string = 'public/assets/octo-chibi-orange.svg';
	octoPurple: string = 'public/assets/octo-chibi-purple.svg';
	octoRed: string = 'public/assets/octo-chibi-red.svg';
	offset: number = 1080;

	images: Array<string> = [
		this.octoBlue,
		this.octoGreen,
		this.octoOrange,
		this.octoPurple,
		this.octoRed,
		this.octoBlue,
		this.octoGreen,
		this.octoOrange,
		this.octoPurple,
		this.octoBlue,
		this.octoPurple,
		this.octoRed
	];

	styles: Array<string> = [
		'octo-chibi small',
		'octo-chibi medium',
		'octo-chibi small',
		'octo-chibi medium',
		'octo-chibi large',
		'octo-chibi small',
		'octo-chibi medium',
		'octo-chibi large',
		'octo-chibi small',
		'octo-chibi small',
		'octo-chibi medium',
		'octo-chibi small'
	];

	constructor() {}

	ngOnInit() {
		
	}

}
