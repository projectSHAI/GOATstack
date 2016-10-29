import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { ErrorHandlerActions } from '../../actions/errorHandler.actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements AfterViewInit {
  @select('error') error$: Observable<string>;

  @ViewChild('errorToast') errorToast;

  constructor(private errorHandler: ErrorHandlerActions) { }

  ngAfterViewInit() {
    // initialize error handling service
    this.errorHandler.initHandler(this.errorToast.nativeElement.children[0]);
  }

}
