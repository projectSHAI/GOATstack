import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'header-section',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnInit {

	constructor() {}

	ngOnInit() {}

}
