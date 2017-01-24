import { Component, AfterViewInit, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';
import { TimeOfDayActions } from '../../../../redux/actions/time-of-day/time-of-day.actions';

@Component({
  selector: 'the-sky',
  templateUrl: './sky.component.html',
  styleUrls: ['./sky.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SkyComponent implements AfterViewInit {
  //using the select decorator to retrieve the timeOfDay object from the redux store. Then assigning it to variable toda$ in the component for use
  @select('timeOfDay') toda$: Observable<any>;
  //The values for the time
  currMinutes: number;
  currHours: number;
  //the position of the sun, we use translate in order to avoid DOM painting
  yPos: string = 'translateY(10px)';
  private windowHeight: number = window.innerHeight;  
  //DI for the toda action to subscribe to the date object, and ref for activating change detection in the subscriptions.
  constructor(public toda: TimeOfDayActions, private ref: ChangeDetectorRef) { }

  ngAfterViewInit() {

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
      //tell the ChangeDetectorRef to mark this component and all parents in the component tree to be checked in the next change detection.
      this.ref.markForCheck();
    });
  }  

  //listens for windowHeight in order to make sure the yPos stays responsive.
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
