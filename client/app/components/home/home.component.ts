import { Component } from '@angular/core';

@Component({
  selector: 'home-section',
  template: `
    <sun-and-moon [style.left.%]="sunXPos" [style.top.%]="sunYPos" ></sun-and-moon>
    <cloud-generator></cloud-generator>
    <mountain-range></mountain-range>
    <the-goat></the-goat>`,
  styles: [`
    :host {
      position: relative;
      display: block;
      height: 1000px;
    }
    the-goat{
      position: absolute;
      width: 200px;
      height: 200px;
      top: 10%;
      left: 46%;
    }
    mountain-range{
      position: absolute;
      bottom: -400px;
      left: 0;
      right: 0;
    }
    mountain-range img{
      width: 100%;
    }
    sun-and-moon{
      position: fixed;
      display: block;
      height: 300px;
      width: 300px;
    }`]
})

export class HomeComponent {

  constructor() { }

}
