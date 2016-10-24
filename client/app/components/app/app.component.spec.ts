/* tslint:disable:no-unused-variable */
import { AppModule } from '../../app.module';
import { RouterTestingModule } from "@angular/router/testing";

import { AppComponent } from './app.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('AppComponent Test', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(done => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule]
    });

    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;

    done();
  });

  it('should instantiate component', () => {
    expect(comp instanceof AppComponent).toBe(true, 'should create AppComponent');
  });
});
