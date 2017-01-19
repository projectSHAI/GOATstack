/*
 * Header E2E Tests
 *
 * Simply tests for the text of the header and logout
 * SVG object
 */
describe('Header E2E Tests', function () {
  
  var EC = protractor.ExpectedConditions;

  it('should not display: Welcome, "userName"', function (done) {
    browser.wait(EC.invisibilityOf(element(by.id('#load-screen'))), 10000);
    expect(element(by.css('#welcome-user.hidden')).isPresent()).toBeTruthy();
    done();
  });

  it('should display: SIGN UP/IN button', function (done) {
    expect(element(by.css('#sign-up-btn')).isPresent()).toBeTruthy();
    expect(element(by.css('#sign-in-btn')).isPresent()).toBeTruthy();
    expect(element(by.css('#sign-up-btn.hidden')).isPresent()).toBeFalsy();
    expect(element(by.css('#sign-in-btn.hidden')).isPresent()).toBeFalsy();
    done();
  });

  it('should not display: SIGN OUT', function (done) {
    expect(element(by.css('#sign-out-btn.hidden')).isPresent()).toBeTruthy();
    done();
  });

  it('should display login form on click', function (done) {
    browser.wait(EC.elementToBeClickable(element(by.css('.nav-trigger'))), 5000); 
    element(by.css('.nav-trigger')).click();

    setTimeout(() => {
      browser.wait(EC.elementToBeClickable(element(by.css('#sign-in-btn'))), 5000); 
      element(by.css('#sign-in-btn')).click();
      expect(element(by.css('#login-btn')).isPresent()).toBeTruthy();
      expect(element(by.css('#signup-btn')).isPresent()).toBeTruthy();
      expect(element(by.css('#back-btn')).isPresent()).toBeTruthy();
    }, 1000);

    done();
  });

  it('should throw "email is not registered" login error', function (done) {
    // setTimeout(() => {
      browser.wait(EC.elementToBeClickable(element(by.id('login_email'))), 5000); 
      element(by.css('#login_email')).sendKeys('test@test.co');
      element(by.css('#login_password')).sendKeys('test');

      element(by.css('#login-btn')).click();
      browser.wait(EC.presenceOf(element(by.id('errorText'))), 2000);
      expect(element(by.id('errorText')).getText()).toEqual('This email is not registered!');
    // }, 1000);
    
    done();
  });

  // it('should throw "password is not correct" login error', function (done) {
  //   element(by.cssContainingText('button', 'SIGN IN')).click();
  //   element(by.id('login_email-input')).sendKeys('test@test.com');
  //   element(by.id('login_password-input')).sendKeys('test1234');

  //   element(by.cssContainingText('button', 'LOGIN')).click();
  //   browser.wait(EC.presenceOf(element(by.id('errorText'))), 2000);
  //   expect(element(by.id('errorText')).getText()).toEqual('This password is not correct!');
  //   done();
  // });

  // it('should login without errors', function (done) {
  //   element(by.cssContainingText('button', 'SIGN IN')).click();
  //   element(by.id('login_email-input')).sendKeys('test@test.com');
  //   element(by.id('login_password-input')).sendKeys('test');
  //   element(by.cssContainingText('button', 'LOGIN')).click();

  //   browser.wait(EC.presenceOf(element(by.id('welcome-user'))), 2000);

  //   expect(element(by.id('welcome-user')).isPresent()).toBeTruthy();
  //   expect(element(by.id('welcome-user')).getText()).toEqual('Welcome, test');
  //   element(by.cssContainingText('button', 'SIGN OUT')).click();
  //   done();
  // });

  // it('should display register form when clicked', function (done) {
  //   element(by.cssContainingText('button', 'SIGN UP')).click();
  //   expect(element(by.cssContainingText('button', 'SIGN UP')).isPresent()).toBeFalsy();
  //   expect(element(by.cssContainingText('button', 'REGISTER')).isPresent()).toBeTruthy();
  //   expect(element(by.cssContainingText('button', 'BACK')).isPresent()).toBeTruthy();

  //   expect(element(by.id('signup_username')).isPresent()).toBeTruthy();
  //   expect(element(by.id('signup_email')).isPresent()).toBeTruthy();
  //   expect(element(by.id('signup_password')).isPresent()).toBeTruthy();
  //   expect(element(by.id('signup_re_password')).isPresent()).toBeTruthy();
  //   done();
  // });

  // it('should display "username is already in use" register error', function (done) {
  //   element(by.id('signup_username-input')).sendKeys('test');
  //   element(by.id('signup_email-input')).sendKeys('thisisatest@test.com');
  //   element(by.id('signup_password-input')).sendKeys('password');
  //   element(by.id('signup_re_password-input')).sendKeys('password');

  //   element(by.cssContainingText('button', 'REGISTER')).click();
  //   browser.wait(EC.presenceOf(element(by.id('errorText'))), 2000);
  //   expect(element(by.id('errorText')).getText()).toEqual('This username is already in use!');
  //   done();
  // });

  // it('should display "email address is already in use" register error', function (done) {
  //   element(by.cssContainingText('button', 'SIGN UP')).click();
  //   element(by.id('signup_username-input')).sendKeys('testUserName');
  //   element(by.id('signup_email-input')).sendKeys('test@test.com');
  //   element(by.id('signup_password-input')).sendKeys('password');
  //   element(by.id('signup_re_password-input')).sendKeys('password');

  //   element(by.cssContainingText('button', 'REGISTER')).click();
  //   browser.wait(EC.presenceOf(element(by.id('errorText'))), 2000);
  //   expect(element(by.id('errorText')).getText()).toEqual('This email address is already in use!');
  //   done();
  // });

  // it('should display "passwords are not the same" register error', function (done) {
  //   element(by.cssContainingText('button', 'SIGN UP')).click();
  //   element(by.id('signup_username-input')).sendKeys('testUserName');
  //   element(by.id('signup_email-input')).sendKeys('thisisatest@test.com');
  //   element(by.id('signup_password-input')).sendKeys('password');
  //   element(by.id('signup_re_password-input')).sendKeys('password123');

  //   element(by.cssContainingText('button', 'REGISTER')).click();
  //   browser.wait(EC.presenceOf(element(by.id('errorText'))), 2000);
  //   expect(element(by.id('errorText')).getText()).toEqual('Inputted passwords are not the same!');
  //   done();
  // });

  // it('should login as newly registered user', function (done) {
  //   element(by.cssContainingText('button', 'SIGN UP')).click();
  //   element(by.id('signup_username-input')).sendKeys('testUserName');
  //   element(by.id('signup_email-input')).sendKeys('thisisatest@test.com');
  //   element(by.id('signup_password-input')).sendKeys('password');
  //   element(by.id('signup_re_password-input')).sendKeys('password');

  //   element(by.cssContainingText('button', 'REGISTER')).click();
  //   browser.wait(EC.presenceOf(element(by.id('welcome-user'))), 2000);

  //   expect(element(by.id('welcome-user')).isPresent()).toBeTruthy();
  //   expect(element(by.id('welcome-user')).getText()).toEqual('Welcome, testUserName');
  //   element(by.cssContainingText('button', 'SIGN OUT')).click();
  //   done();
  // });

});