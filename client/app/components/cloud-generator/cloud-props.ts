declare let TweenMax: any;
declare let TimelineMax: any;

class CloudProps {

  static cloudStyle: Array<string> = new Array(10);
  private static randomInt: number;

  static cloudType(wonderName, index) {

    CloudProps.randomInt = CloudProps.rndInt(1, 3);

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

    TweenMax.to(el, CloudProps.rndInt(1, 3), { opacity: 1});

    console.log(el.style.left);

    let anima = new TimelineMax({onComplete:loopAnima, onCompleteParams:["loop"]});

    anima.to(el, CloudProps.rndInt(40, 70), {left: '+=100%'})
          .addLabel("loop", "+=0")
          .to(el, 0, {left: '-=200%'})
          .to(el, CloudProps.rndInt(40, 70), {left: '+=200%'});

    function loopAnima(position) {
      anima.play(position);
    }

  }




  static rndInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

export default CloudProps;
