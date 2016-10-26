import { Injectable, ElementRef } from '@angular/core';

declare let TweenMax: any;
declare let TimelineMax: any;
declare let Power0: any;

@Injectable()
export class CloudProps {

  private counter: number;
  cloudStyle: Array<string>;
  animaArray: Array<any>;

  constructor() {
    this.counter = 0;
    this.cloudStyle = new Array<string>(10);
    this.animaArray = new Array<any>(10);
  }

  private cloudAnimaAfterCB(afterWonders: any, item: any, index: number, position: string): void {
    afterWonders[index].replace(item);
    this.loopAnima(index, position);
  }

  private loopAnima(index: number, position: string): void {
    this.animaArray[index].play(position);
  }

  cloudType(wonderLength: number, index: number): void {
    let randomInt = this.rndInt(1, 3);

    if (wonderLength <= 4) {

      switch (randomInt) {
        case 1:
          this.cloudStyle[index] = 'smallcloud1';
          break;
        case 2:
          this.cloudStyle[index] = 'smallcloud2';
          break;
        case 3:
          this.cloudStyle[index] = 'smallcloud3';
          break;
      }

    }
    else if (wonderLength > 4 && wonderLength <= 15) {

      switch (randomInt) {
        case 1:
          this.cloudStyle[index] = 'mediumcloud1';
          break;
        case 2:
          this.cloudStyle[index] = 'mediumcloud2';
          break;
        case 3:
          this.cloudStyle[index] = 'mediumcloud3';
          break;
      }

    }
    else {

      switch (randomInt) {
        case 1:
          this.cloudStyle[index] = 'largecloud1';
          break;
        case 2:
          this.cloudStyle[index] = 'largecloud2';
          break;
        case 3:
          this.cloudStyle[index] = 'largecloud3';
          break;
      }

    }
  }

  cloudAnima(value: string, el: ElementRef, object: any, index: number): string {

    if (this.counter < 10) {
      let anima = new TimelineMax({
        callbackScope: this,
        onComplete: this.loopAnima,
        onCompleteParams: [index, "loop"]
      });

      anima.to(el, this.rndInt(1, 3), { opacity: 1 })
        .to(el, this.rndInt(30, 85), { ease: Power0.easeNone, x: window.innerWidth + 350, y: this.rndInt(-200, 200) }, 0)
        .addLabel("loop", "+=0")
        .add(() => this.cloudType(object.name.length, index))
        .to(el, 0, { ease: Power0.easeNone, left: '-350px', x: '0', y: '0' })
        .to(el, 1, { opacity: 1 })
        .to(el, this.rndInt(30, 55), { ease: Power0.easeNone, x: window.innerWidth + 350, y: this.rndInt(-200, 200) });

      this.counter++;
      this.animaArray[index] = anima;
      return value;
    }

    return value;

  }

  cloudAnimaAfter(el: ElementRef, afterWonders: any, item: any, index: number): void {
    TweenMax.to(el, 1, {
      opacity: 0,
      callbackScope: this,
      onComplete: this.cloudAnimaAfterCB,
      onCompleteParams: [afterWonders, item, index, "loop"]
    });
  }

  rndInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
