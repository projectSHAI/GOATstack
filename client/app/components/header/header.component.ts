import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  // moduleId: module.id,
  selector: 'header-section',




  template: `
    <header>
      <main-navbar></main-navbar>
      <signinout></signinout>
      <div class='app-title'>
        <object id="logo" type="image/svg+xml" data="assets/goatlogo.svg">Your browser does not support SVGs</object>
        <h1>GOAT Stack</h1>
      </div>

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
      width: 300px;
      display: block;
      margin: 0 auto;
    }
    .app-title h1{
      font-family: cursive;
      padding: 10px;
      text-align: center;
      vertical-align: top;
      font-size: 32px;
      color: white;
      display: inline-block;
    }
    #logo{
      display: inline-block;
      opacity: 0.8;
      width: 50px;
      height: 50px;
    }
    `]




})

export class HeaderComponent {

}
