/* tslint:disable:no-unused-variable */
import { AppModule } from '../../app.module';
import { RouterTestingModule } from "@angular/router/testing";

import { FooterComponent } from './footer.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('FooterComponent Test', () => {
  let comp: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(done => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule]
    });

    fixture = TestBed.createComponent(FooterComponent);
    comp = fixture.componentInstance;

    done();
  });

  it('should instantiate component', () => {
    expect(comp instanceof FooterComponent).toBe(true, 'should create FooterComponent');
  });
});
