/* tslint:disable:no-unused-variable */
import { AppModule } from '../../app.module';
import { RouterTestingModule } from "@angular/router/testing";

import { Four0FourComponent } from './four0four.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

let comp: Four0FourComponent;
let fixture: ComponentFixture<Four0FourComponent>;

describe('Four0FourComponent Test', () => {
  beforeEach(done => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule]
    });

    fixture = TestBed.createComponent(Four0FourComponent);

    done();
  });

  it('should instantiate component', () => {
    expect(fixture.componentInstance instanceof Four0FourComponent).toBe(true, 'should create Four0FourComponent');
  });
});
