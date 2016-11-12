import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';

import { TimeOfDayActions } from '../../actions/time-of-day/time-of-day.actions';
import { select } from 'ng2-redux';
import{ Observable } from 'rxjs/Observable';

@Component({
  selector: 'the-sky',
  templateUrl: './sky.component.html',
  styleUrls: ['./sky.component.scss']
})

export class SkyComponent {
  @select('timeOfDay') toda$: Observable<any>;

  private sunMoonGlow: string;
  private yPos: number = 10;
  private windowHeight: number = window.innerHeight;

  constructor(public toda: TimeOfDayActions, private hostRef: ElementRef) { }


  ngAfterViewInit() {

    this.toda$.subscribe(x => {
      this.hostRef.nativeElement.children[0].src = x.get('skySvg');
      this.hostRef.nativeElement.children[1].style.boxShadow = x.get('sunMoonGlow');
      this.hostRef.nativeElement.children[1].style.borderColor = x.get('sunMoonBorder');
    });

    //set the height of the sun and moon whenever the time changes
    this.toda.getCurrentTime().subscribe(x => {

      this.yPos = this.windowHeight - (this.windowHeight * (((x.getHours() % 12) * 60 + x.getMinutes()) / 780 ));

      this.hostRef.nativeElement.children[1].style.transform = `translateY(${this.yPos}px)`;
    });
  }

  //listens for windowHeight
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowHeight = event.target.innerHeight;
  }

}
