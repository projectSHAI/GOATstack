declare let TweenMax: any;
declare let TimelineMax: any;

class CloudProps {

  static cloudStyle: Array<string> = new Array(10);
  private static randomInt: number;

  static cloudType(wonderName, index) {

    CloudProps.randomInt = CloudProps.getRandomInt(1, 3);

    if (wonderName <= 4) {

      switch (CloudProps.randomInt) {
        case 1:
          CloudProps.cloudStyle[index] = 'smallcloud1';
          break;
        case 2:
          CloudProps.cloudStyle[index] = 'smallcloud1';
          break;
        case 3:
          CloudProps.cloudStyle[index] = 'smallcloud1';
          break;
      }

    }
    else if (wonderName > 4 && wonderName <= 15) {

      switch (CloudProps.randomInt) {
        case 1:
          CloudProps.cloudStyle[index] = 'mediumcloud2';
          break;
        case 2:
          CloudProps.cloudStyle[index] = 'mediumcloud2';
          break;
        case 3:
          CloudProps.cloudStyle[index] = 'mediumcloud2';
          break;
      }

    }
    else {

      switch (CloudProps.randomInt) {
        case 1:
          CloudProps.cloudStyle[index] = 'largecloud3';
          break;
        case 2:
          CloudProps.cloudStyle[index] = 'largecloud3';
          break;
        case 3:
          CloudProps.cloudStyle[index] = 'largecloud3';
          break;
      }

    }
  }



  static cloudAnima(el) {

    TweenMax.to(el, CloudProps.getRandomInt(1, 3), { opacity: 1 });


    tl = new TimelineMax();

    tl.to(el, 10, {x: '100%'});

  }



  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

export default CloudProps;
