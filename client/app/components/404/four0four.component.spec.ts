/* tslint:disable:no-unused-variable */
import { AppModule } from '../../app.module';
import { RouterTestingModule } from "@angular/router/testing";

import { Four0FourComponent } from './four0four.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('Four0FourComponent Test', () => {
  let comp: Four0FourComponent;
  let fixture: ComponentFixture<Four0FourComponent>;

  beforeEach(done => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule]
    });

    fixture = TestBed.createComponent(Four0FourComponent);
    comp = fixture.componentInstance;

    done();
  });

  it('should instantiate component', () => {
    expect(comp instanceof Four0FourComponent).toBe(true, 'should create Four0FourComponent');
  });
});
