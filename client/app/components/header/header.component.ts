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
    header{
      background-image: url(../../../assets/banner.jpg);
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
