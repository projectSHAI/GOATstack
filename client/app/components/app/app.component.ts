import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ErrorHandlerService } from '../../services/errorHandler/errorHandler.service';

@Component({
  // moduleId: module.id,
  selector: 'my-app',
  template: `
  <header-section></header-section>
  <router-outlet></router-outlet>
  <footer-section></footer-section>
  <div #errorToast><md-card class="error-card">
    <md-toolbar color="accent">Error Message</md-toolbar>
    <md-card-content class="error-content">
        <table style="width: 100%" cellspacing="0"><tr>
          <td><p>{{errorHandler.errorMessage}}</p></td>
        </tr></table>
    </md-card-content>
  </md-card></div>`,
  styles: [`
    .error-card {
      opacity: 0;
      z-index: 1000;
      width: 20%;
      padding: 0;
      position: fixed;
      bottom: 60px;
      right: 40px;
    }
    .error-content {
      padding: 15px;
      font-size: medium;
      font-family: Roboto, "Helvetica Neue", sans-serif;
    }`]
})

export class AppComponent implements AfterViewInit {
  @ViewChild('errorToast') errorToast;

  constructor(private errorHandler: ErrorHandlerService) { }

  ngAfterViewInit() {
    this.errorHandler.initHandler(this.errorToast.nativeElement.children[0]);
  }

}
