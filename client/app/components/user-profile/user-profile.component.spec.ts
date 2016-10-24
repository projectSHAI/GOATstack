/* tslint:disable:no-unused-variable */
import { AppModule } from '../../app.module';
import { RouterTestingModule } from "@angular/router/testing";

import { UserProfileComponent } from './user-profile.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('UserProfileComponent Test', () => {
  let comp: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(done => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule]
    });

    fixture = TestBed.createComponent(UserProfileComponent);
    comp = fixture.componentInstance;

    done();
  });

  it('should instantiate component', () => {
    expect(comp instanceof UserProfileComponent).toBe(true, 'should create UserProfileComponent');
  });
});
