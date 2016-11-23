import { Component, AfterViewInit, HostListener } from '@angular/core';

import { TimeOfDayActions } from '../../actions/time-of-day/time-of-day.actions';
import { select } from 'ng2-redux';
import{ Observable } from 'rxjs/Observable';

@Component({
  selector: 'the-troposphere',
  templateUrl: './troposphere.component.html',
  styleUrls: ['./troposphere.component.scss']
})

export class TroposphereComponent implements AfterViewInit{
  @select('timeOfDay') toda$: Observable<any>;

  sunMoonGlow: string;
  sunMoonBorder: string;

  yPos: string = 'translateY(10px)';
  private windowHeight: number = window.innerHeight;

  constructor(public toda: TimeOfDayActions) { }


  ngAfterViewInit() {

    this.toda$.subscribe(x => {
      this.sunMoonGlow = x.get('sunMoonGlow');
      this.sunMoonBorder = x.get('sunMoonBorder');
    });

    //set the height of the sun and moon whenever the time changes
    this.toda.getCurrentTime().subscribe(x => {

      this.yPos = `translateY(-${150 + this.windowHeight - (this.windowHeight * (((x.getHours() % 12) * 60 + x.getMinutes()) / 780 ))}px)`;

    });
  }

  //listens for windowHeight
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowHeight = event.target.innerHeight;
  }

}
