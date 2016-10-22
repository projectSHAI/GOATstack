import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <header-section></header-section>
  <router-outlet></router-outlet>
  <footer-section></footer-section>`
})

export class AppComponent { }
