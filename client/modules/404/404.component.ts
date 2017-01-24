import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'four0four-section',
  template: '<p>404 Page not found</p>',
  styles: ['p {font-size: 48px; display: block; position: relative; width: 100%; text-align: center; margin-top: 100px;}'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Four0FourComponent { }
