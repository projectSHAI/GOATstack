import { Component, HostListener, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CloudActions } from '../../../sky-segment/actions/cloud/cloud.actions';

import { select } from 'ng2-redux';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'home-section',
  providers: [CloudActions],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent { 

  @select('timeOfDay') toda$: Observable<any>;

  scrollTop: number;
  winHeight: number  = window.innerHeight; 
  past:      boolean = false;

  constructor(
    private cloudActions: CloudActions,
    private ref:          ChangeDetectorRef
    ) { }

  @HostListener('window:scroll', ['$event'])
  scroll(event) {
      this.scrollTop = document.body.scrollTop;

      if(this.scrollTop <= (this.winHeight * 1.5) && this.past === true) {
      	  this.cloudActions.resumeAnima();
          this.past = false;
      }
      if(this.scrollTop >= (this.winHeight * 1.5) && this.past === false) {
      	  this.cloudActions.pauseAnima();
          this.past = true;
      }
      this.ref.markForCheck();
  }

}
