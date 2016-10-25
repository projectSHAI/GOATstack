/* tslint:disable:no-unused-variable */
import { AppModule } from '../../app.module';
import { RouterTestingModule } from "@angular/router/testing";
import { DebugElement } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
  getMe(): Observable<User> { return Observable.of(user); }
  login(userName: string, email: string): Observable<User> {
    Cookie.set('token', 'token_test');
    return Observable.of(user);
  }
  logout(): void { Cookie.delete('token'); }
  signup(username: string, email: string, password: string): Observable<User> { return Observable.of(user); }
}

describe('SignInOutComponent Test', () => {
  let comp: SignInOutComponent;
  let fixture: ComponentFixture<SignInOutComponent>;
  let userService: DebugElement;

  beforeEach(done => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
        { provide: UserService, useClass: MockUserService },
        Cookie
      ]
    });

    fixture = TestBed.createComponent(SignInOutComponent);
    comp = fixture.debugElement.componentInstance;

    userService = fixture.debugElement.injector.get(UserService);
    Cookie.set('token', 'token_test');

    done();
  });

  it('should instantiate component', () => {
    expect(comp instanceof SignInOutComponent).toBe(true);
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
    expect(comp.currentUser).toBe(user);
  });

  it('should remove currentUser after logout called', () => {
    let getMeSpy = spyOn(userService, 'getMe')
      .and.returnValue(Observable.of(user));

    fixture.detectChanges();
    expect(getMeSpy.calls.any()).toBe(true, 'getMe called');
    expect(comp.currentUser).toEqual(user);

    let logoutSpy = spyOn(userService, 'logout')
      .and.returnValue(Cookie.delete('token'));

    fixture.detectChanges();
    comp.logout();
    fixture.detectChanges();
    expect(logoutSpy.calls.any()).toBe(true, 'logout called');
    expect(comp.currentUser).toBe(null);
    fixture.detectChanges();
    expect(Cookie.get('token')).toBe(null);

  });

  it('should add currentUser after registerUser called', () => {
    Cookie.delete('token');

    let signupSpy = spyOn(userService, 'signup')
      .and.returnValue(Observable.of(user));

    let form = new FormGroup({
      signup_username: new FormControl("testUser"),
      signup_email: new FormControl("testEmail"),
      signup_password: new FormControl("test"),
      signup_re_password: new FormControl("test")
    });

    fixture.detectChanges();
    //simulate opening the signup form
    comp.userSignup = true;
    fixture.detectChanges();
    //simulate registering new user
    comp.registerUser(form);
    fixture.detectChanges();
    expect(signupSpy.calls.any()).toBe(true, 'signup called');
    expect(comp.currentUser).toBe(user);

  });

  it('should add currentUser after login called', () => {
    Cookie.delete('token');

    let loginSpy = spyOn(userService, 'login')
      .and.returnValue(Observable.of(user));

    let form = new FormGroup({
      login_email: new FormControl("test"),
      login_password: new FormControl("test")
    });

    fixture.detectChanges();
    //simulate opening the login form
    comp.userSigning = true;
    fixture.detectChanges();
    //simulate logging in
    comp.login(form);
    fixture.detectChanges();
    expect(loginSpy.calls.any()).toBe(true, 'login called');
    expect(comp.currentUser).toBe(user);

  });
});
