/* tslint:disable:no-unused-variable */
import { Four0FourComponent } from './four0four.component';

import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('Four0FourComponent Test', () => {
  let fixture;
  let comp;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Four0FourComponent]
    });
  });

  it('should instantiate component', () => {
    TestBed.compileComponents().then(() => {

      fixture = TestBed.createComponent(Four0FourComponent);
      expect(fixture.componentInstance instanceof Four0FourComponent).toBe(true, 'should create Four0FourComponent');

    });
  });
});
