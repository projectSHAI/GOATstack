describe('GOAT-stack E2E Tests', function () {
    beforeAll(function () {
        // Important to have this line
        browser.ignoreSynchronization = true;
        browser.get('');
    });

    /*
     * Header E2E Tests
     */
     describe('Header E2E Tests', function () {

       var title = 'GOAT Stack';

       it('Header should display: ' + title, function () {
           expect(element(by.css('.app-title>h1')).isPresent()).toBeTruthy();
           expect(element(by.css('.app-title>h1')).getText()).toEqual(title);
       });

       it('Header should display: SVG Object', function () {
           expect(element(by.css('#logo')).isPresent()).toBeTruthy();
       });

     });

    /*
     * Signinout E2E Tests
     */
     describe('Signinout E2E Tests', function () {

       it('should not display: Welcome, "userName"', function () {
           expect(element(by.css('.user-sign>h3')).isPresent()).toBeFalsy();
       });

       it('should display: SIGN UP/IN button', function () {
           expect(element(by.cssContainingText('button', 'SIGN UP')).isPresent()).toBeTruthy();
           expect(element(by.cssContainingText('button', 'SIGN IN')).isPresent()).toBeTruthy();
       });

       it('should not display: SIGN OUT', function () {
           expect(element(by.cssContainingText('button', 'SIGN OUT')).isPresent()).toBeFalsy();
       });

     });
});
