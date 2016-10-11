/* tslint:disable:no-unused-variable */
import { AppModule } from '../../app.module';
import { RouterTestingModule } from "@angular/router/testing";

import { AppComponent } from './app.component';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('AppComponent Test', () => {
  let fixture;
  let comp;

  beforeEach(done => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule]
    });

    fixture = TestBed.createComponent(AppComponent);

    done();
  });

  it('should instantiate component', () => {
    expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
  });
});
