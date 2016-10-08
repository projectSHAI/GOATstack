/* tslint:disable:no-unused-variable */
// import { Http, Request, RequestOptionsArgs, Response, XHRBackend, RequestOptions, ConnectionBackend, Headers } from '@angular/http';
// import { HttpIntercept } from '../../services/auth/auth.service';
//
//
// import { BrowserModule } from '@angular/platform-browser';
// import { HttpModule, JsonpModule } from '@angular/http';
// import { FormsModule } from '@angular/forms';

import { RouterTestingModule } from "@angular/router/testing";
import { appRoutes } from '../../routes';

import { AppModule } from '../../app.module';
// import { routing } from '../../routes';
// import {APP_BASE_HREF} from '@angular/common';

import { Cookie } from 'ng2-cookies/ng2-cookies';

// import { AppComponent } from '../app/app.component';
import { HeaderComponent } from './header.component';
// import { FooterComponent } from '../footer/footer.component';
// import { HomeComponent }        from '../home/home.component';
// import { Four0FourComponent }   from '../404/four0four.component';
// import { UserProfileComponent }   from '../user-profile/user-profile.component';
//
import { UserService } from '../../services/user/user.service';
import { ClockService } from '../../services/clock/clock.service';
import { Observable } from 'rxjs/Observable';

import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { User } from '../../models/user/user.model';

class MockUserService {

  user = new User({
    _id: 123456,
    userName: 'testName',
    firstName: 'testFirst',
    lastName: 'testLast',
    email: 'test@email.com',
    create: 'now',
    role: 'user'
  });

  public getMe(): Observable<User> { return Observable.of(this.user); };

};

class MockClockService {

};

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
      imports: [
        AppModule,
        RouterTestingModule.withRoutes(appRoutes)
      ],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: ClockService, useClass: MockClockService }
      ]
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

  it('should still not show currentUser after component initialized', () => {
    // Set cookie token, for the getMe to call
    Cookie.set('token', 'test_token_alpha');

    fixture.detectChanges();
    expect(spy.calls.any()).toBe(true, 'getMe called');
  });

  it('should show currentUser after getMe promise', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(comp.currentUser).toEqual(user);
  }));
});
