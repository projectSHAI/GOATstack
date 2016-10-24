import { Injectable, ElementRef } from '@angular/core';

declare let TweenMax: any;
declare let TimelineMax: any;

@Injectable()
export class ErrorHandlerService {
  errorMessage: string;
  timeline: any;

  constructor() { }

  initHandler(el: ElementRef) {
    this.timeline = new TimelineMax({ paused:true });

    this.timeline.to(el, 1, { opacity: 1 })
      .to(el, 1, { opacity: 0 }, "+=3");
  }

  error(error: string): void {
    this.errorMessage = error;
    this.timeline.play(0);
  }
}
