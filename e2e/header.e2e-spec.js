/*
 * Header E2E Tests
 *
 * Simply tests for the text of the header and logout
 * SVG object
 */
describe('Header E2E Tests', function () {
  
    var EC = protractor.ExpectedConditions;

    it('should not display: Welcome, "userName"', function (done) {
      browser.wait(EC.invisibilityOf(element(by.id('#load-screen'))), 6000); 
      expect(element(by.css('#welcome-user')).isPresent()).toBeFalsy();
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
        // test for both mobile /non mobile
        element(by.css('.nav-trigger')).isPresent().then((prom) => {
            if (prom) {
                browser.wait(EC.elementToBeClickable(element(by.css('.nav-trigger'))), 2000); 
                element(by.css('.nav-trigger')).click();
                browser.sleep(1050);
                element(by.css('#sign-in-btn')).click();
                browser.sleep(1050);
                expect(element(by.css('#login_email')).isPresent()).toBeTruthy();
                expect(element(by.css('#login_password')).isPresent()).toBeTruthy();
                expect(element(by.css('#login-btn')).isPresent()).toBeTruthy();
                expect(element(by.css('#signup-btn')).isPresent()).toBeTruthy();
                expect(element(by.css('#back-btn')).isPresent()).toBeTruthy();        
            } else {
                element(by.css('#sign-in-btn')).click();
                browser.sleep(1050);
                expect(element(by.css('#login_email')).isPresent()).toBeTruthy();
                expect(element(by.css('#login_password')).isPresent()).toBeTruthy();
                expect(element(by.css('#login-btn')).isPresent()).toBeTruthy();
                expect(element(by.css('#signup-btn')).isPresent()).toBeTruthy();
                expect(element(by.css('#back-btn')).isPresent()).toBeTruthy();        
            }
        });  
      
        done();
    });

    it('should throw "email is not registered" login error', function (done) {
      element(by.css('#login_email-input')).clear().sendKeys('test@test.co');
      element(by.css('#login_password-input')).clear().sendKeys('test');
      element(by.css('#login-btn')).click();

      browser.wait(EC.presenceOf(element(by.css('#error-text'))), 2000);
      browser.sleep(500);
      expect(element(by.css('#error-text')).getText()).toEqual('This email is not registered!');
      
      done();
    });

    it('should throw "password is not correct" login error', function (done) {   
        element(by.css('.nav-trigger')).isPresent().then((prom) => {
            if (prom) {
                element(by.css('.nav-trigger')).click();
                browser.sleep(1050);   
                element(by.css('#sign-in-btn')).click();
                browser.sleep(1050);
                element(by.css('#login_email-input')).clear().sendKeys('test@test.com');
                element(by.css('#login_password-input')).clear().sendKeys('tes');
                element(by.css('#login-btn')).click();

                browser.sleep(500);
                expect(element(by.css('#error-text')).getText()).toEqual('This password is not correct!');
            } else {  
                element(by.css('#sign-in-btn')).click();
                browser.sleep(1050);
                element(by.css('#login_email-input')).clear().sendKeys('test@test.com');
                element(by.css('#login_password-input')).clear().sendKeys('tes');
                element(by.css('#login-btn')).click();

                browser.sleep(500);
                expect(element(by.css('#error-text')).getText()).toEqual('This password is not correct!');
            }
        }); 
      
        done();
    });

    it('should login without errors', function (done) {
        element(by.css('.nav-trigger')).isPresent().then((prom) => {
            if (prom) {
                element(by.css('.nav-trigger')).click();
                browser.sleep(1050);   
                element(by.css('#sign-in-btn')).click();
                browser.sleep(1050);
                element(by.css('#login_email-input')).clear().sendKeys('test@test.com');
                element(by.css('#login_password-input')).clear().sendKeys('test');
                element(by.css('#login-btn')).click();

                browser.sleep(500);

                expect(element(by.css('#welcome-user')).isPresent()).toBeTruthy();
                expect(element(by.css('#welcome-user')).getText()).toEqual('Welcome, test');
                element(by.css('.nav-trigger')).click();
                browser.sleep(1050);  
                element(by.css('#sign-out-btn')).click();
            } else {  
               element(by.css('#sign-in-btn')).click();
               browser.sleep(1050);
               element(by.css('#login_email-input')).clear().sendKeys('test@test.com');
               element(by.css('#login_password-input')).clear().sendKeys('test');
               element(by.css('#login-btn')).click();

               browser.sleep(500);

               expect(element(by.css('#welcome-user')).isPresent()).toBeTruthy();
               expect(element(by.css('#welcome-user')).getText()).toEqual('Welcome, test');
               element(by.css('#sign-out-btn')).click();         
            }
        }); 

        done();
    });

    it('should display register form when clicked', function (done) {
        element(by.css('.nav-trigger')).isPresent().then((prom) => {
            if (prom) {
                browser.sleep(1000);
                element(by.css('.nav-trigger')).click();
                browser.sleep(1050);   
                element(by.css('#sign-up-btn')).click();
                browser.sleep(1050);
                expect(element(by.css('#back-btn2')).isPresent()).toBeTruthy();
                expect(element(by.css('#signin-btn')).isPresent()).toBeTruthy();
                expect(element(by.css('#reg-btn')).isPresent()).toBeTruthy();

                expect(element(by.css('#signup_username')).isPresent()).toBeTruthy();
                expect(element(by.css('#signup_email')).isPresent()).toBeTruthy();
                expect(element(by.css('#signup_password')).isPresent()).toBeTruthy();
                expect(element(by.css('#signup_re_password')).isPresent()).toBeTruthy();
            } else { 
                element(by.css('#sign-up-btn')).click();
                browser.sleep(1050);
                expect(element(by.css('#back-btn2')).isPresent()).toBeTruthy();
                expect(element(by.css('#signin-btn')).isPresent()).toBeTruthy();
                expect(element(by.css('#reg-btn')).isPresent()).toBeTruthy();

                expect(element(by.css('#signup_username')).isPresent()).toBeTruthy();
                expect(element(by.css('#signup_email')).isPresent()).toBeTruthy();
                expect(element(by.css('#signup_password')).isPresent()).toBeTruthy();
                expect(element(by.css('#signup_re_password')).isPresent()).toBeTruthy();
            }
        }); 

        done();
    });

    it('should display "username is already in use" register error', function (done) {
      element(by.id('signup_username-input')).clear().sendKeys('test');
      element(by.id('signup_email-input')).clear().sendKeys('thisisatest@test.com');
      element(by.id('signup_password-input')).clear().sendKeys('password');
      element(by.id('signup_re_password-input')).clear().sendKeys('password');

      element(by.css('#reg-btn')).click();
      browser.wait(EC.presenceOf(element(by.css('#error-text'))), 2000);
      browser.sleep(500);
      expect(element(by.css('#error-text')).getText()).toEqual('This username is already in use!');
      done();
    });

    it('should display "email address is already in use" register error', function (done) {
        element(by.css('.nav-trigger')).isPresent().then((prom) => {
            if (prom) {
                element(by.css('.nav-trigger')).click();
                browser.sleep(1050);    
                element(by.css('#sign-up-btn')).click();
                browser.sleep(1050);
                element(by.css('#signup_username-input')).clear().sendKeys('testUserName');
                element(by.css('#signup_email-input')).clear().sendKeys('test@test.com');
                element(by.css('#signup_password-input')).clear().sendKeys('password');
                element(by.css('#signup_re_password-input')).clear().sendKeys('password');

                element(by.css('#reg-btn')).click();
                browser.wait(EC.presenceOf(element(by.css('#error-text'))), 2000);
                browser.sleep(500);
                expect(element(by.css('#error-text')).getText()).toEqual('This email address is already in use!');
            } else {
                element(by.css('#sign-up-btn')).click();
                browser.sleep(1050);
                element(by.css('#signup_username-input')).clear().sendKeys('testUserName');
                element(by.css('#signup_email-input')).clear().sendKeys('test@test.com');
                element(by.css('#signup_password-input')).clear().sendKeys('password');
                element(by.css('#signup_re_password-input')).clear().sendKeys('password');

                element(by.css('#reg-btn')).click();
                browser.wait(EC.presenceOf(element(by.css('#error-text'))), 2000);
                browser.sleep(500);
                expect(element(by.css('#error-text')).getText()).toEqual('This email address is already in use!');                    
            }
        }); 

        done();
    });

    it('should display "passwords are not the same" register error', function (done) {
        element(by.css('.nav-trigger')).isPresent().then((prom) => {
            if (prom) {
                element(by.css('.nav-trigger')).click();
                browser.sleep(1050);    
                element(by.css('#sign-up-btn')).click();
                browser.sleep(1050);
                element(by.css('#signup_username-input')).clear().sendKeys('testUserName');
                element(by.css('#signup_email-input')).clear().sendKeys('thisisatest@test.com');
                element(by.css('#signup_password-input')).clear().sendKeys('password');
                element(by.css('#signup_re_password-input')).clear().sendKeys('password123');

                element(by.css('#reg-btn')).click();
                browser.wait(EC.presenceOf(element(by.css('#error-text'))), 2000);
                browser.sleep(500);
                expect(element(by.css('#error-text')).getText()).toEqual('Inputted passwords are not the same!');
            } else {   
                element(by.css('#sign-up-btn')).click();
                browser.sleep(1050);
                element(by.css('#signup_username-input')).clear().sendKeys('testUserName');
                element(by.css('#signup_email-input')).clear().sendKeys('thisisatest@test.com');
                element(by.css('#signup_password-input')).clear().sendKeys('password');
                element(by.css('#signup_re_password-input')).clear().sendKeys('password123');

                element(by.css('#reg-btn')).click();
                browser.wait(EC.presenceOf(element(by.css('#error-text'))), 2000);
                browser.sleep(500);
                expect(element(by.css('#error-text')).getText()).toEqual('Inputted passwords are not the same!');        
            }
        }); 

        done();
    });

    it('should login as newly registered user', function (done) {
        element(by.css('.nav-trigger')).isPresent().then((prom) => {
            if (prom) {
                element(by.css('.nav-trigger')).click();
                browser.sleep(1050);   
                element(by.css('#sign-up-btn')).click();
                browser.sleep(1050);
                element(by.css('#signup_username-input')).clear().sendKeys('testUserName');
                element(by.css('#signup_email-input')).clear().sendKeys('thisisatest@test.com');
                element(by.css('#signup_password-input')).clear().sendKeys('password');
                element(by.css('#signup_re_password-input')).clear().sendKeys('password');

                element(by.css('#reg-btn')).click();
                browser.wait(EC.presenceOf(element(by.css('#welcome-user'))), 2000);

                expect(element(by.css('#welcome-user')).isPresent()).toBeTruthy();
                expect(element(by.css('#welcome-user')).getText()).toEqual('Welcome, testUserName');
                element(by.css('.nav-trigger')).click();
                browser.sleep(1050);    
                element(by.css('#sign-out-btn')).click();
            } else {
                 element(by.css('#sign-up-btn')).click();
                 browser.sleep(1050);
                 element(by.css('#signup_username-input')).clear().sendKeys('testUserName');
                 element(by.css('#signup_email-input')).clear().sendKeys('thisisatest@test.com');
                 element(by.css('#signup_password-input')).clear().sendKeys('password');
                 element(by.css('#signup_re_password-input')).clear().sendKeys('password');

                 element(by.css('#reg-btn')).click();
                 browser.wait(EC.presenceOf(element(by.css('#welcome-user'))), 2000);

                 expect(element(by.css('#welcome-user')).isPresent()).toBeTruthy();
                 expect(element(by.css('#welcome-user')).getText()).toEqual('Welcome, testUserName');
                 element(by.css('#sign-out-btn')).click();                   
            }
        }); 

        done();
    });

});
