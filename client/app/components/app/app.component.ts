import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ErrorHandlerService } from '../../services/errorHandler/errorHandler.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit {
  @ViewChild('errorToast') errorToast;

  constructor(private errorHandler: ErrorHandlerService) { }

  ngAfterViewInit() {
    this.errorHandler.initHandler(this.errorToast.nativeElement.children[0]);
  }

}
