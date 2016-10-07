/* tslint:disable:no-unused-variable */
import { AppComponent } from './app.component';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('AppComponent Test', () => {
  let fixture;
  let comp;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent]
    });
  });

  it('should instantiate component', () => {
    TestBed.compileComponents().then(() => {

      fixture = TestBed.createComponent(AppComponent);
      expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');

    });
  });

  it('should pass component test function', () => {
    TestBed.compileComponents().then(() => {

      fixture = TestBed.createComponent(AppComponent);
      comp = fixture.componentInstance;
      expect(comp.test()).toBe('this is a test');

    });
  });

});
