/* tslint:disable:no-unused-variable */
import { AppModule } from '../../app.module';
import { RouterTestingModule } from "@angular/router/testing";

import { UserProfileComponent } from './user-profile.component';

import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('UserProfileComponent Test', () => {
  let fixture;
  let comp;

  beforeEach(done => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule]
    });

    fixture = TestBed.createComponent(UserProfileComponent);

    done();
  });

  it('should instantiate component', () => {
    expect(fixture.componentInstance instanceof UserProfileComponent).toBe(true, 'should create UserProfileComponent');
  });
});
