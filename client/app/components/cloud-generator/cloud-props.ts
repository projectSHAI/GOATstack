export class CloudProps {

  cloudStyle: Array<string> = [];
  randomInt: number;

  static cloudType(wonderName) {

    randomInt = CloudProps.getRandomInt(1, 3);

    if(wonderName <= 4) {
      switch(CloudProps.randomInt) {
        case 1:
            CloudProps.cloudStyle.push('smallcloud1');
            break;
        case 2:
            CloudProps.cloudStyle.push('smallcloud1');
            break;
        case 3:
            CloudProps.cloudStyle.push('smallcloud1');
            break;
      }
    }
    else if(wonderName > 4 && wonderName <= 15) {
      switch(CloudProps.randomInt) {
        case 1:
            CloudProps.cloudStyle.push('mediumcloud2');
            break;
        case 2:
            CloudProps.cloudStyle.push('mediumcloud2');
            break;
        case 3:
            CloudProps.cloudStyle.push('mediumcloud2');
            break;
      }
    }
    else{
      switch(CloudProps.randomInt) {
        case 1:
            CloudProps.cloudStyle.push('largecloud3');
            break;
        case 2:
            CloudProps.cloudStyle.push('largecloud3');
            break;
        case 3:
            CloudProps.cloudStyle.push('largecloud3');
            break;
      }
      console.log(wonderName);
    }
  }

  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
