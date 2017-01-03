/*
* Signinout E2E Tests
*
* Tests for error message backend response and sign in
* and register user key actions
*/
describe('Signinout E2E Tests', function () {

  var EC = protractor.ExpectedConditions;

  it('should not display: Welcome, "userName"', function (done) {
    expect(element(by.css('.user-sign>h3')).isPresent()).toBeFalsy();
    done();
  });

  it('should display: SIGN UP/IN button', function (done) {
    expect(element(by.cssContainingText('button', 'SIGN UP')).isPresent()).toBeTruthy();
    expect(element(by.cssContainingText('button', 'SIGN IN')).isPresent()).toBeTruthy();
    done();
  });

  it('should not display: SIGN OUT', function (done) {
    expect(element(by.cssContainingText('button', 'SIGN OUT')).isPresent()).toBeFalsy();
    done();
  });

  it('should display login form on click', function (done) {
    element(by.cssContainingText('button', 'SIGN IN')).click();
    expect(element(by.cssContainingText('button', 'SIGN IN')).isPresent()).toBeFalsy();
    expect(element(by.cssContainingText('button', 'SIGN UP')).isPresent()).toBeTruthy();
    expect(element(by.cssContainingText('button', 'BACK')).isPresent()).toBeTruthy();
    done();
  });

  it('should throw "email is not registered" login error', function (done) {
    element(by.id('login_email-input')).sendKeys('test@test.co');
    element(by.id('login_password-input')).sendKeys('test');

    element(by.cssContainingText('button', 'LOGIN')).click();
    browser.wait(EC.presenceOf(element(by.id('errorText'))), 2000);
    expect(element(by.id('errorText')).getText()).toEqual('This email is not registered!');
    done();
  });

  it('should throw "password is not correct" login error', function (done) {
    element(by.cssContainingText('button', 'SIGN IN')).click();
    element(by.id('login_email-input')).sendKeys('test@test.com');
    element(by.id('login_password-input')).sendKeys('test1234');

    element(by.cssContainingText('button', 'LOGIN')).click();
    browser.wait(EC.presenceOf(element(by.id('errorText'))), 2000);
    expect(element(by.id('errorText')).getText()).toEqual('This password is not correct!');
    done();
  });

  it('should login without errors', function (done) {
    element(by.cssContainingText('button', 'SIGN IN')).click();
    element(by.id('login_email-input')).sendKeys('test@test.com');
    element(by.id('login_password-input')).sendKeys('test');
    element(by.cssContainingText('button', 'LOGIN')).click();

    browser.wait(EC.presenceOf(element(by.id('welcome-user'))), 2000);

    expect(element(by.id('welcome-user')).isPresent()).toBeTruthy();
    expect(element(by.id('welcome-user')).getText()).toEqual('Welcome, test');
    element(by.cssContainingText('button', 'SIGN OUT')).click();
    done();
  });

  it('should display register form when clicked', function (done) {
    element(by.cssContainingText('button', 'SIGN UP')).click();
    expect(element(by.cssContainingText('button', 'SIGN UP')).isPresent()).toBeFalsy();
    expect(element(by.cssContainingText('button', 'REGISTER')).isPresent()).toBeTruthy();
    expect(element(by.cssContainingText('button', 'BACK')).isPresent()).toBeTruthy();

    expect(element(by.id('signup_username')).isPresent()).toBeTruthy();
    expect(element(by.id('signup_email')).isPresent()).toBeTruthy();
    expect(element(by.id('signup_password')).isPresent()).toBeTruthy();
    expect(element(by.id('signup_re_password')).isPresent()).toBeTruthy();
    done();
  });

  it('should display "username is already in use" register error', function (done) {
    element(by.id('signup_username-input')).sendKeys('test');
    element(by.id('signup_email-input')).sendKeys('thisisatest@test.com');
    element(by.id('signup_password-input')).sendKeys('password');
    element(by.id('signup_re_password-input')).sendKeys('password');

    element(by.cssContainingText('button', 'REGISTER')).click();
    browser.wait(EC.presenceOf(element(by.id('errorText'))), 2000);
    expect(element(by.id('errorText')).getText()).toEqual('This username is already in use!');
    done();
  });

  it('should display "email address is already in use" register error', function (done) {
    element(by.cssContainingText('button', 'SIGN UP')).click();
    element(by.id('signup_username-input')).sendKeys('testUserName');
    element(by.id('signup_email-input')).sendKeys('test@test.com');
    element(by.id('signup_password-input')).sendKeys('password');
    element(by.id('signup_re_password-input')).sendKeys('password');

    element(by.cssContainingText('button', 'REGISTER')).click();
    browser.wait(EC.presenceOf(element(by.id('errorText'))), 2000);
    expect(element(by.id('errorText')).getText()).toEqual('This email address is already in use!');
    done();
  });

  it('should display "passwords are not the same" register error', function (done) {
    element(by.cssContainingText('button', 'SIGN UP')).click();
    element(by.id('signup_username-input')).sendKeys('testUserName');
    element(by.id('signup_email-input')).sendKeys('thisisatest@test.com');
    element(by.id('signup_password-input')).sendKeys('password');
    element(by.id('signup_re_password-input')).sendKeys('password123');

    element(by.cssContainingText('button', 'REGISTER')).click();
    browser.wait(EC.presenceOf(element(by.id('errorText'))), 2000);
    expect(element(by.id('errorText')).getText()).toEqual('Inputted passwords are not the same!');
    done();
  });

  it('should login as newly registered user', function (done) {
    element(by.cssContainingText('button', 'SIGN UP')).click();
    element(by.id('signup_username-input')).sendKeys('testUserName');
    element(by.id('signup_email-input')).sendKeys('thisisatest@test.com');
    element(by.id('signup_password-input')).sendKeys('password');
    element(by.id('signup_re_password-input')).sendKeys('password');

    element(by.cssContainingText('button', 'REGISTER')).click();
    browser.wait(EC.presenceOf(element(by.id('welcome-user'))), 2000);

    expect(element(by.id('welcome-user')).isPresent()).toBeTruthy();
    expect(element(by.id('welcome-user')).getText()).toEqual('Welcome, testUserName');
    element(by.cssContainingText('button', 'SIGN OUT')).click();
    done();
  });

});