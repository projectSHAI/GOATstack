describe('App E2E Tests', function () {

  var EC = protractor.ExpectedConditions;
  var defaultConfig = eval(require('typescript')
    .transpile(require('graceful-fs')
      .readFileSync('./config/env/default.ts')
      .toString()));

  it('should contain correct title tag', function () {
    expect(browser.getTitle()).toEqual("GOAT-stack");
  });

  it('should contain correct favicon', function () {
    expect(element(by.id('favicon')).getAttribute('href'))
      .toEqual('http://localhost:7001/public/assets/favicon.png');
  });

  it('should contain correct meta description', function () {
    expect(element(by.name('description')).getAttribute('content')).toEqual("The Greatest of All Time Stack!");
  });

  it('should contain correct meta keywords', function () {
    expect(element(by.name('keywords')).getAttribute('content'))
      .toEqual("redux, node, mongo, express, angular2, ng2, jasmine, karma, protractor");
  });

});