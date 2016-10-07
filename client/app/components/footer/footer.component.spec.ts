/* tslint:disable:no-unused-variable */
import { FooterComponent } from './footer.component';

import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('FooterComponent Test', () => {
  let fixture;
  let comp;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent]
    });
  });

  it('should instantiate component', () => {
    TestBed.compileComponents().then(() => {

      fixture = TestBed.createComponent(FooterComponent);
      expect(fixture.componentInstance instanceof FooterComponent).toBe(true, 'should create FooterComponent');

    });
  });
});
