/* tslint:disable:no-unused-variable */
import { AppModule } from '../../app.module';
import { RouterTestingModule } from "@angular/router/testing";
import { DebugElement }    from '@angular/core';

import { SignInOutComponent } from './signinout.component';

import { UserService } from '../../services/user/user.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Observable } from 'rxjs/Observable';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { User } from '../../models/models.namespace';

let user = new User({
  _id: 123456,
  userName: 'testName',
  firstName: 'testFirst',
  lastName: 'testLast',
  email: 'test@email.com',
  create: 'now',
  role: 'user'
});

class MockUserService {
  getMe(): Observable<User> {
    return Observable.of(user);
  }
  login(userName: string, email: string): Observable<User> {
    return Observable.of(user);
  }
  logout() {
    return Cookie.delete('token');
  }
}

let comp: SignInOutComponent;
let fixture: ComponentFixture<SignInOutComponent>;
let userService: DebugElement;
Cookie.set('token', 'token_test');

describe('SignInOutComponent Test', () => {
  beforeEach(done => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
        { provide: UserService, useClass: MockUserService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignInOutComponent);
    comp = fixture.componentInstance;

    userService = fixture.debugElement.injector.get(UserService);

    done();
  });

  it('should instantiate component', () => {
    expect(fixture.componentInstance instanceof SignInOutComponent).toBe(true);
  });

  it('should not show currentUser before OnInit', () => {
    let getMeSpy = spyOn(userService, 'getMe')
      .and.returnValue(Observable.of(user));

    expect(getMeSpy.calls.any()).toBe(false, 'getMe not yet called');
  });

  it('should show currentUser after component initialized', () => {
    let getMeSpy = spyOn(userService, 'getMe')
      .and.returnValue(Observable.of(user));

    fixture.detectChanges();
    expect(getMeSpy.calls.any()).toBe(true, 'getMe called');
    expect(comp.currentUser).toEqual(user);
  });

  it('should remove currentUser after logout called', () => {
    let logoutSpy = spyOn(userService, 'logout');

    fixture.detectChanges();
    comp.logout();
    fixture.detectChanges();
    expect(logoutSpy.calls.any()).toBe(true, 'logout called');
    expect(comp.currentUser).toBe(null);
    // expect(Cookie.get('token')).toBe(null);

  });

  it('should remove then add currentUser after logout and login', () => {
    let logoutSpy = spyOn(userService, 'logout');
    let loginSpy = spyOn(userService, 'login')
      .and.returnValue(Observable.of(user));

    fixture.detectChanges();
    comp.logout();
    fixture.detectChanges();
    expect(logoutSpy.calls.any()).toBe(true, 'logout called');
    expect(comp.currentUser).toBe(null);
    // comp.login('testName', 'test@email.com');
    // fixture.detectChanges();
    // expect(loginSpy.calls.any()).toBe(true, 'logout called');
    // expect(comp.currentUser).toBe(user);

  });

  // ERROR: using async or fakeAsync will cause errors!!

  // it('should show currentUser after getMe promise', fakeAsync(() => {
  //   fixture.detectChanges();
  //   tick();
  //   fixture.detectChanges();
  //   expect(comp.currentUser).toEqual(user);
  // }));
});
