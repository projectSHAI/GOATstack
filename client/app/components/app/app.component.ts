import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  moduleId: module.id,
  template: `
  <header-section></header-section>
  <router-outlet></router-outlet>
  <footer-section></footer-section>`
})

export class AppComponent {

  constructor() {}

  test(): string {
    return 'this is a test';
  }
}
