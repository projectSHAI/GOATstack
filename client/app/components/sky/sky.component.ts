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

  public dayTime: boolean;
  public clock: any;
  public sunMoonGlow: string;
  clockSubscription;

  safeTransform;
  safeRGBA;

  public sunMoonX: number = 25;
  public sunMoonY: number = 25;
  sunMoonAngle: number;

  radius: number = 1000;
  centerX = 500;
  centerY = 500;

  constructor(public clockService: ClockService, private sanitizer: DomSanitizer, private hostRef: ElementRef) {

    this.clock = this.clockService.currentTime;

  }


  ngAfterViewInit() {
    this.centerX = this.hostRef.nativeElement.offsetWidth / 2 - (this.sunMoon.nativeElement.offsetWidth / 2);
    this.centerY = this.hostRef.nativeElement.offsetHeight / 4 - (this.sunMoon.nativeElement.offsetHeight / 2);
    this.radius = this.hostRef.nativeElement.offsetWidth / 2;

    this.clockSubscription = this.clock.subscribe(time => {

      if (time.getHours() >= 6 && time.getHours() <= 18) {
        this.dayTime = true;
        this.sunMoonGlow = "0px 0px 100px 12px orange";
        this.safeRGBA = this.sanitizer.bypassSecurityTrustStyle("rgba(255,129,0, 0.3)");
        this.hostRef.nativeElement.style.backgroundColor = "#5394be";
      }
      else {
        this.dayTime = false;
        this.sunMoonGlow = "0px 0px 100px 12px purple";
        this.safeRGBA = this.sanitizer.bypassSecurityTrustStyle("rgba(102,51,153, 0.3)");
        this.hostRef.nativeElement.style.backgroundColor = "#120e19";
      }

      this.sunMoonAngle = Math.floor(((time.getHours() % 12) * 60 + time.getMinutes()) * 0.25);

      this.plotSunOnArc(this.sunMoonAngle, this.radius, this.centerX, this.centerY);

      this.safeTransform = this.sanitizer.bypassSecurityTrustStyle("translate( " + this.sunMoonX + "px, " + this.sunMoonY + "px )");

    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.centerX = this.hostRef.nativeElement.offsetWidth / 2 - (this.sunMoon.nativeElement.offsetWidth / 2);
    this.centerY = this.hostRef.nativeElement.offsetHeight / 4 - (this.sunMoon.nativeElement.offsetHeight / 2);
    this.radius = this.hostRef.nativeElement.offsetWidth / 2;

    this.plotSunOnArc(this.sunMoonAngle, this.radius, this.centerX, this.centerY);
    this.safeTransform = this.sanitizer.bypassSecurityTrustStyle("translate( " + this.sunMoonX + "px, " + this.sunMoonY + "px )");
  }


  plotSunOnArc(angle, radius, centerX, centerY) {
    this.sunMoonX = centerX + radius * Math.cos(this.toRadians(angle));
    this.sunMoonY = centerY + radius * Math.sin(this.toRadians(angle));
  }



  toRadians(angle) {
    return angle * (Math.PI / 180);
  }

}
