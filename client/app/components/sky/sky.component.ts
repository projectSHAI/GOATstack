import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

import { ClockService }  from '../../services/clock/clock.service';

@Component({
  selector: 'the-sky',
  providers: [ClockService],
  templateUrl: './sky.component.html',
  styleUrls: ['./sky.component.scss']
})

export class SkyComponent {
  @ViewChild('sunMoon') sunMoon: ElementRef;

  //declare time variables
  clock: any;
  sunMoonGlow: string;
  clockSubscription;

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


  constructor(public clockService: ClockService, private sanitizer: DomSanitizer, private hostRef: ElementRef) {
    //syns the clock variable to the current time provided by the service
    this.clock = this.clockService.currentTime;
  }


  ngAfterViewInit() {
    //logic to set the position of the sun and moon
    this.sunMoonPos();

    this.clockSubscription = this.clock.subscribe(time => {
      //sets the css based on the time of day
      this.timeOfDayCss()

      this.sunMoonAngle = (Math.floor((((time.getHours() + 6) % 12) * 60 + time.getMinutes()) * 0.25)) + 180;

      this.plotSunOnArc(this.sunMoonAngle, this.radius, this.centerX, this.centerY);
      this.safeTransform = this.sanitizer.bypassSecurityTrustStyle("translate( " + this.sunMoonX + "px, " + this.sunMoonY + "px )");
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    //logic to set the position of the sun and moon
    this.sunMoonPos();

    this.plotSunOnArc(this.sunMoonAngle, this.radius, this.centerX, this.centerY);
    this.safeTransform = this.sanitizer.bypassSecurityTrustStyle("translate( " + this.sunMoonX + "px, " + this.sunMoonY + "px )");
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

  timeOfDayCss() {
    if(this.clockService.sunRise) {
      this.sunMoonGlow = "0px 0px 100px 12px orange";
      this.safeRGBA = this.sanitizer.bypassSecurityTrustStyle("rgba(255,129,0, 0.3)");
      this.hostRef.nativeElement.style.backgroundColor = "#2f556d";
    }
    else if(this.clockService.dayTime) {
      this.sunMoonGlow = "0px 0px 100px 12px yellow";
      this.safeRGBA = this.sanitizer.bypassSecurityTrustStyle("rgba(255,255,0, 0.3)");
      this.hostRef.nativeElement.style.backgroundColor = "#5394be";
    }
    else if(this.clockService.sunSet) {
      this.sunMoonGlow = "0px 0px 100px 12px orange";
      this.safeRGBA = this.sanitizer.bypassSecurityTrustStyle("rgba(255,129,0, 0.3)");
      this.hostRef.nativeElement.style.backgroundColor = "#2f556d";
    }
    else if(this.clockService.nightTime) {
      this.sunMoonGlow = "0px 0px 100px 12px purple";
      this.safeRGBA = this.sanitizer.bypassSecurityTrustStyle("rgba(102,51,153, 0.3)");
      this.hostRef.nativeElement.style.backgroundColor = "#0a001b";
    }
    else{
      console.log('time of day not valid check sky.component.ts');
    }
  }

}
