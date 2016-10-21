/* tslint:disable:no-unused-variable */
import { AppModule } from '../../app.module';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { RouterTestingModule } from "@angular/router/testing";
import { appRoutes } from '../../routes';

import { HeaderComponent } from './header.component';

import { UserService } from '../../services/user/user.service';
import { ClockService } from '../../services/clock/clock.service';
import { Observable } from 'rxjs/Observable';

import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { User } from '../../models/models.namespace';

describe('HeaderComponent Test', () => {
  let fixture;
  let comp;
  let userService;
  let spy;

  let user = new User({
    _id: 123456,
    userName: 'testName',
    firstName: 'testFirst',
    lastName: 'testLast',
    email: 'test@email.com',
    create: 'now',
    role: 'user'
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule]
    }).compileComponents().then(() => {

    });

    fixture = TestBed.createComponent(HeaderComponent);
    comp = fixture.componentInstance;

    userService = fixture.debugElement.injector.get(UserService);

    spy = spyOn(userService, 'getMe')
      .and.returnValue(Observable.of(user));

  });

  it('should instantiate component', () => {
    expect(fixture.componentInstance instanceof HeaderComponent).toBe(true);
  });

  it('should not show currentUser before OnInit', () => {
    expect(spy.calls.any()).toBe(false, 'getMe not yet called');
  });

  it('should show currentUser after component initialized', () => {
    // Set cookie token, for the getMe to call
    Cookie.set('token', 'test_token_alpha');

    fixture.detectChanges();
    expect(spy.calls.any()).toBe(true, 'getMe called');
    expect(comp.currentUser).toEqual(user);
  });

  // ERROR: using async or fakeAsync will cause errors!!

  // it('should show currentUser after getMe promise', fakeAsync(() => {
  //   fixture.detectChanges();
  //   tick();
  //   fixture.detectChanges();
  //   expect(comp.currentUser).toEqual(user);
  // }));
});
