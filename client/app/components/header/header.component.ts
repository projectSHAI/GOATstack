import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  // moduleId: module.id,
  selector: 'header-section',




  template: `
    <header>
      <main-navbar></main-navbar>
      <signinout></signinout>
      <h1 class='app-title'>GOAT Stack</h1>
    </header>`,




  styles: [`
    :host{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10000;
    }
    header{
      position: relative;
    }
    .app-title{
      font-family: cursive;
      padding: 15px;
      text-align: center;
      font-size: 36px;
      color: white;
    }
    `]




})

export class HeaderComponent {

}
