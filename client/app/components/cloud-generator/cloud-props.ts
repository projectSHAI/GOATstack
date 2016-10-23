import {ViewChild} from '@angular/core';

declare let TweenMax: any;
declare let TimelineMax: any;
declare let Power0: any;

class CloudProps {


  static cloudStyle: Array<string> = new Array(10);
  private static randomInt: number;
  static counter: number = 0;
  static animaArray: Array<any> = new Array(10);

  static cloudType(wonderLength: number, index: number): void {
    CloudProps.randomInt = CloudProps.rndInt(1, 3);

    if (wonderLength <= 4) {

      switch (CloudProps.randomInt) {
        case 1:
          CloudProps.cloudStyle[index] = 'smallcloud1';
          break;
        case 2:
          CloudProps.cloudStyle[index] = 'smallcloud2';
          break;
        case 3:
          CloudProps.cloudStyle[index] = 'smallcloud3';
          break;
      }

    }
    else if (wonderLength > 4 && wonderLength <= 15) {

      switch (CloudProps.randomInt) {
        case 1:
          CloudProps.cloudStyle[index] = 'mediumcloud1';
          break;
        case 2:
          CloudProps.cloudStyle[index] = 'mediumcloud2';
          break;
        case 3:
          CloudProps.cloudStyle[index] = 'mediumcloud3';
          break;
      }

    }
    else {

      switch (CloudProps.randomInt) {
        case 1:
          CloudProps.cloudStyle[index] = 'largecloud1';
          break;
        case 2:
          CloudProps.cloudStyle[index] = 'largecloud2';
          break;
        case 3:
          CloudProps.cloudStyle[index] = 'largecloud3';
          break;
      }

    }
  }



  static cloudAnima(value: string, afterWonders: any, object: any, el, index: number): string {

    if (CloudProps.counter < 10) {
      let anima = new TimelineMax({ onComplete: CloudProps.loopAnima, onCompleteParams: [index, "loop"] });

      anima.to(el, 0, { ease: Power0.easeNone, left: object.xcoor + "%", top: object.ycoor + "%" })
        .to(el, CloudProps.rndInt(1, 3), { opacity: 1 })
        .to(el, 25, { ease: Power0.easeNone, left: '100%' }, 0)
        .addLabel("loop", "+=0")
        .add(() => CloudProps.cloudType(object.name.length, index))
        .to(el, 0, { ease: Power0.easeNone, left: '-15%', top: object.ycoor + "%" })
        .to(el, 1, { opacity: 1 })
        .to(el, 25, { ease: Power0.easeNone, left: '+=115%' });


      CloudProps.counter++;
      CloudProps.animaArray[index] = anima;
      return value;
    }

    return value;

  }

  static cloudAnimaAfter(el, afterWonders: any, item: any, index: number): void {
    TweenMax.to(el, 1, { opacity: 0, onComplete: CloudProps.cloudAnimaAfterCB, onCompleteParams: [afterWonders, item, index, "loop"] });
  }

  private static cloudAnimaAfterCB(afterWonders: any, item: any, index: number, position: string): void {
    afterWonders[index].replace(item);
    CloudProps.loopAnima(index, position);
  }

  private static loopAnima(index: number, position: string): void {
    CloudProps.animaArray[index].play(position);
  }

  static rndInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

export default CloudProps;
