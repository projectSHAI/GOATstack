import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

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
  @ViewChild('sunMoon') sunMoon: ElementRef;

  //declare time variables
  sunMoonGlow: string;

  //declare css values used in one way data binding to template properties
  safeTransform;
  safeRGBA;

  //declare sun and moon trig values
  centerX: number;
  centerY: number;
  sunMoonX: number;
  sunMoonY: number;
  sunMoonAngle: number;
  radius: number;
  skyColor: "red";


  constructor(public toda: TimeOfDayActions, private sanitizer: DomSanitizer, private hostRef: ElementRef) { }


  ngAfterViewInit() {
    //logic to set the position of the sun and moon
    this.sunMoonPos();

    this.toda.getCurrentTime().subscribe(time => {

      this.sunMoonAngle = (Math.floor((((time.getHours() + 6) % 12) * 60 + time.getMinutes()) * 0.25)) + 180;

      this.plotSunOnArc(this.sunMoonAngle, this.radius, this.centerX, this.centerY);
      this.safeTransform = this.sanitizer.bypassSecurityTrustStyle(`translate( ${this.sunMoonX}px, ${this.sunMoonY}px )`);
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    //logic to set the position of the sun and moon
    this.sunMoonPos();

    this.plotSunOnArc(this.sunMoonAngle, this.radius, this.centerX, this.centerY);
    this.safeTransform = this.sanitizer.bypassSecurityTrustStyle(`translate( ${this.sunMoonX}px, ${this.sunMoonY}px )`);
  }


  plotSunOnArc(angle, radius, centerX, centerY) {
    this.sunMoonX = radius * Math.cos(this.toRadians(angle));
    this.sunMoonY = radius * Math.sin(this.toRadians(angle));
  }

  toRadians(angle) {
    return angle * (Math.PI / 180);
  }

  sunMoonPos() {
    this.centerX = this.hostRef.nativeElement.offsetWidth / 2 - (this.sunMoon.nativeElement.offsetWidth / 2);
    this.centerY = this.hostRef.nativeElement.offsetHeight;

    if(this.hostRef.nativeElement.offsetHeight < this.hostRef.nativeElement.offsetWidth) {
      if(this.hostRef.nativeElement.offsetHeight < this.hostRef.nativeElement.offsetWidth / 2) {
        this.radius = this.hostRef.nativeElement.offsetHeight;
      }
      else{
        this.radius = this.hostRef.nativeElement.offsetWidth / 2 - this.sunMoon.nativeElement.offsetWidth;
      }
    }
    else{
      this.radius = this.hostRef.nativeElement.offsetWidth / 2 - this.sunMoon.nativeElement.offsetWidth;
    }
  }
}
