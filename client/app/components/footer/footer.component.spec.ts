/* tslint:disable:no-unused-variable */
import { AppModule } from '../../app.module';
import { RouterTestingModule } from "@angular/router/testing";

import { FooterComponent } from './footer.component';

import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('FooterComponent Test', () => {
  let fixture;
  let comp;

  beforeEach(done => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule]
    });

    fixture = TestBed.createComponent(FooterComponent);

    done();
  });

  it('should instantiate component', () => {
    expect(fixture.componentInstance instanceof FooterComponent).toBe(true, 'should create FooterComponent');
  });
});
