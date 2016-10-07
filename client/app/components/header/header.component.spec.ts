/* tslint:disable:no-unused-variable */
import { HeaderComponent } from './header.component';
import { UserService } from '../../services/user/user.service';
import { ClockService } from '../../services/clock/clock.service';

import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('HeaderComponent Test', () => {
  let fixture;
  let comp;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [UserService, ClockService]
    });
  });

  it('should instantiate component', () => {
    TestBed.compileComponents().then(() => {

      fixture = TestBed.createComponent(HeaderComponent);
      expect(fixture.componentInstance instanceof HeaderComponent).toBe(true, 'should create HeaderComponent');

    });
  });
});
