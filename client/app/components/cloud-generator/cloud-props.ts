export default class {

  cloudStyle: Array<string> = [];
  randomInt: number;

  cloudType(wonderName) {

    this.randomInt = this.getRandomInt(1, 3);

    if(wonderName <= 4) {
      switch(this.randomInt) {
        case 1:
            this.cloudStyle.push('smallcloud1');
            break;
        case 2:
            this.cloudStyle.push('smallcloud1');
            break;
        case 3:
            this.cloudStyle.push('smallcloud1');
            break;
      }
    }
    else if(wonderName > 4 && wonderName <= 15) {
      switch(this.randomInt) {
        case 1:
            this.cloudStyle.push('mediumcloud2');
            break;
        case 2:
            this.cloudStyle.push('mediumcloud2');
            break;
        case 3:
            this.cloudStyle.push('mediumcloud2');
            break;
      }
    }
    else{
      switch(this.randomInt) {
        case 1:
            this.cloudStyle.push('largecloud3');
            break;
        case 2:
            this.cloudStyle.push('largecloud3');
            break;
        case 3:
            this.cloudStyle.push('largecloud3');
            break;
      }
      console.log(wonderName);
    }
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
