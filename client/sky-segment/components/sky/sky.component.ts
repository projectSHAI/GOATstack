import { Component, OnInit, ElementRef, AfterViewInit, HostListener } from '@angular/core';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { TimeOfDayActions } from '../../../main-segment/actions/time-of-day/time-of-day.actions';

@Component({
  moduleId: module.id,
  selector: 'the-sky',
  templateUrl: './sky.component.html',
  styleUrls: ['./sky.component.css']
})

export class SkyComponent implements OnInit, AfterViewInit {

  @select('timeOfDay') toda$: Observable<any>;
  
  sunMoonGlow: string;
  sunMoonBorder: string;

  currMinutes: number;
  currHours: number;

  yPos: string = 'translateY(10px)';
  private windowHeight: number = window.innerHeight;  

  constructor(private el: ElementRef, public toda: TimeOfDayActions) { }

  ngOnInit() {
    
    this.toda$.subscribe(x => this.el.nativeElement.style.background = x.get('skyColor'));

  }
  ngAfterViewInit() {
    this.toda$.subscribe(x => {
      this.sunMoonGlow = x.get('sunMoonGlow');
      this.sunMoonBorder = x.get('sunMoonBorder');
    });

    // Set the height of the sun and moon whenever the time changes
    this.toda.getCurrentTime().subscribe(x => {

      if ((x.getHours() >= 6 && x.getHours() < 12) || (x.getHours() >= 18 && x.getHours() < 24) && (x.getMinutes() !== this.currMinutes)) {
        this.currMinutes = x.getMinutes();
        this.currHours = x.getHours();
        // Between 6AM and 12PM the sun will travel up
        // Between 6PM and 12AM the moon will travel up
        // Divide the translation into 6 hours * 60 minute intervals
        this.yPos = `translateY(-${((this.windowHeight / (6*60)) * (((x.getHours() % 6)*60) + (x.getMinutes())))}px)`;
      } else if (x.getMinutes() !== this.currMinutes) {
        this.currMinutes = x.getMinutes();
        this.currHours = x.getHours();
        // Between 12PM and 6PM the sun will travel down
        // Between 12AM and 6AM the moon will travel down
        this.yPos = `translateY(-${this.windowHeight - ((this.windowHeight / (6*60)) * (((x.getHours() % 6)*60) + (x.getMinutes())))}px)`;
      }

    });
  }  

  //listens for windowHeight
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowHeight = event.target.innerHeight;

    // Set the height of the sun and moon whenever window resize happens
    if ((this.currHours >= 6 && this.currHours < 12) || (this.currHours >= 18 && this.currHours < 24)) {
      // Between 6AM and 12PM the sun will travel up
      // Between 6PM and 12AM the moon will travel up
      // Divide the translation into 6 hours * 60 minute intervals
      this.yPos = `translateY(-${((this.windowHeight / (6*60)) * (((this.currHours % 6)*60) + (this.currMinutes)))}px)`;
    } else {
      // Between 12PM and 6PM the sun will travel down
      // Between 12AM and 6AM the moon will travel down
      this.yPos = `translateY(-${this.windowHeight - ((this.windowHeight / (6*60)) * (((this.currHours % 6)*60) + (this.currMinutes)))}px)`;
    }

  }  

}
