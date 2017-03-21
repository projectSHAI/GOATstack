import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'footer-section',
  template: require('./footer.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush  
})

export class FooterComponent { }
