/* tslint:disable:no-unused-variable */
import { AppModule } from '../../app.module';
import { RouterTestingModule } from "@angular/router/testing";

import { UserProfileComponent } from './user-profile.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

let comp: UserProfileComponent;
let fixture: ComponentFixture<UserProfileComponent>;

describe('UserProfileComponent Test', () => {
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
