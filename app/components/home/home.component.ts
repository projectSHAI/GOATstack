import { Component } from '@angular/core';

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
