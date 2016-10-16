describe('QuickStart E2E Tests', function () {
    var title = 'GOAT Stack';

    beforeAll(function () {
        // Important to have this line
        browser.ignoreSynchronization = true;
        browser.get('');
    });

    it('should display: ' + title, function () {
        expect(element(by.css('.app-title')).isPresent()).toBeTruthy();
        expect(element(by.css('.app-title')).getText()).toEqual(title);
    });

    it('should display: Wonders', function () {
        expect(element(by.css('.dream-reflection')).isPresent()).toBeTruthy();
        expect(element(by.css('.dream-reflection')).getText()).toEqual('Wonders');
    });
});
