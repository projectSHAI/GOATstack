import { Component, OnInit } from '@angular/core';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'mountain-goat',
  templateUrl: './mountain-goat.component.html',
  styleUrls: ['./mountain-goat.component.scss']
})

export class MountainGoatComponent implements OnInit{

  @select('timeOfDay') toda$: Observable<any>;

  goatSvg: string;

  constructor(){ }

  ngOnInit() {
    this.toda$.subscribe(x => {
      this.goatSvg = x.get('mountainGoatSvg');
    });
  }

}
