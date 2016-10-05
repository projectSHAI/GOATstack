describe('QuickStart E2E Tests', function() {
  let title = 'MEA2N Fullstack';

  beforeAll(() => {
    // Important to have this line
    browser.ignoreSynchronization = true;
    browser.get('');
  });

  it('should display: ' + title, () => {
    expect(element(by.css('.app-title')).isPresent()).toBeTruthy();
    expect(element(by.css('.app-title')).getText()).toEqual(title);
  });

  it('should display: Home', () => {
    expect(element(by.css('.app-test')).isPresent()).toBeTruthy();
    expect(element(by.css('.app-test')).getText()).toEqual('Home');
  });
});
