describe('App E2E Tests', function () {

  var EC = protractor.ExpectedConditions;
  var defaultConfig = eval(require('typescript')
    .transpile(require('graceful-fs')
      .readFileSync('./config/env/default.ts')
      .toString()));

  it('should contain correct title tag', function () {
    expect(browser.getTitle()).toEqual(defaultConfig.app.title);
  });

  it('should contain correct favicon', function () {
    expect(element(by.id('favicon')).getAttribute('href'))
      .toEqual('http://localhost:7001/' + defaultConfig.app.favicon);
  });

  it('should contain correct meta description', function () {
    expect(element(by.name('description')).getAttribute('content')).toEqual(defaultConfig.app.description);
  });

  it('should contain correct meta keywords', function () {
    expect(element(by.name('keywords')).getAttribute('content'))
      .toEqual(defaultConfig.app.keywords);
  });

});