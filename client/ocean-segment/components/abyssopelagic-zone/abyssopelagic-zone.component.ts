import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'abyssopelagic-zone',
  templateUrl: './abyssopelagic-zone.component.html',
  styleUrls: ['./abyssopelagic-zone.component.css']
})

export class AbyssopelagicZoneComponent implements OnInit{ 

	offset: number = 400;
	angler: string = 'public/assets/angler.svg';

	constructor() {}

	ngOnInit() {



	}

}
