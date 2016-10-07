/* tslint:disable:no-unused-variable */
import { UserProfileComponent } from './user-profile.component';

import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('UserProfileComponent Test', () => {
  let fixture;
  let comp;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent]
    });
  });

  it('should instantiate component', () => {
    TestBed.compileComponents().then(() => {

      fixture = TestBed.createComponent(UserProfileComponent);
      expect(fixture.componentInstance instanceof UserProfileComponent).toBe(true, 'should create UserProfileComponent');

    });
  });
});
