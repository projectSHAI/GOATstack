"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
// SEO Actions: used to get or change the title, icon link, meta tags
//              in the heaa of the index.html
var 
// SEO Actions: used to get or change the title, icon link, meta tags
//              in the heaa of the index.html
SEOActions = /** @class */ (function () {
    function SEOActions(titleService) {
        this.titleService = titleService;
        /**
            * get the <head> Element
            * @type {any}
            */
        this.headElement = document.getElementsByTagName('head');
        this.favicon = document.head.querySelector('link[rel=icon]');
        this.metaDescription = this.getOrCreateMetaElement('description');
        this.metaKeywords = this.getOrCreateMetaElement('keywords');
    }
    /**
     * get the HTML Element when it is in the markup, or create it.
     * @param name
     * @returns {HTMLElement}
     */
    /**
       * get the HTML Element when it is in the markup, or create it.
       * @param name
       * @returns {HTMLElement}
       */
    SEOActions.prototype.getOrCreateMetaElement = /**
       * get the HTML Element when it is in the markup, or create it.
       * @param name
       * @returns {HTMLElement}
       */
    function (name) {
        var el;
        el = document.head.querySelector('meta[name=' + name + ']');
        if (el === null) {
            el = document.createElement('meta');
            el.setAttribute('name', name);
            this.headElement[0].appendChild(el);
        }
        return el;
    };
    // get the current site site
    // get the current site site
    SEOActions.prototype.getTitle = 
    // get the current site site
    function () {
        return this.titleService.getTitle();
    };
    // set the site title
    // set the site title
    SEOActions.prototype.setTitle = 
    // set the site title
    function (newTitle) {
        this.titleService.setTitle(newTitle);
    };
    // get the current link icon
    // get the current link icon
    SEOActions.prototype.getLinkFavicon = 
    // get the current link icon
    function () {
        return this.favicon.getAttribute('href');
    };
    // set the site link icon
    // set the site link icon
    SEOActions.prototype.setLinkFavicon = 
    // set the site link icon
    function (href) {
        this.favicon.setAttribute('href', href);
    };
    // get the current meta description
    // get the current meta description
    SEOActions.prototype.getMetaDescription = 
    // get the current meta description
    function () {
        return this.metaDescription.getAttribute('content');
    };
    // set the meta description
    // set the meta description
    SEOActions.prototype.setMetaDescription = 
    // set the meta description
    function (description) {
        this.metaDescription.setAttribute('content', description);
    };
    // get the current meta keywords
    // get the current meta keywords
    SEOActions.prototype.getMetaKeywords = 
    // get the current meta keywords
    function () {
        return this.metaKeywords.getAttribute('content').split(',');
    };
    // set the meta keywords
    // set the meta keywords
    SEOActions.prototype.setMetaKeywords = 
    // set the meta keywords
    function (keywords) {
        this.metaKeywords.setAttribute('content', keywords.toString());
    };
    SEOActions.prototype.setAll = function (object) {
        if (object.title)
            this.setTitle(object.title);
        if (object.favicon)
            this.setLinkFavicon(object.favicon);
        if (object.description)
            this.setMetaDescription(object.description);
        if (object.keywords)
            this.setMetaKeywords(object.keywords);
    };
    return SEOActions;
}());
exports.SEOActions = SEOActions;
