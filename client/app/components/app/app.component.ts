import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  moduleId: module.id,
  templateUrl: 'app.html'
})

export class AppComponent {

  constructor() {}

  test(): string {
    return 'this is a test';
  }
}
