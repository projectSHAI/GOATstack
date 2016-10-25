import { Component } from '@angular/core';

//give javascript variables from custom js libraries a type so the
//typescript compiler does not throw an error TS2304: Cannot find name 'var'.
declare let TweenMax: any;
declare let TimelineMax: any;

@Component({
  selector: 'home-section',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {

  sunXPos: number = 24;
  sunYPos = 1;
  skyColor: "rgb(83,148,190)";

}
