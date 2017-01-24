import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

////////////////////////////////////////////////////////////////////////
// SEO Actions: used to get or change the title, icon link, meta tags
//              in the heaa of the index.html
////////////////////////////////////////////////////////////////////////
@Injectable()
export class SEOActions {
  private headElement: any;
  private favicon: any;
  private metaDescription: any;
  private metaKeywords: any;

  constructor(private titleService: Title) {
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
  private getOrCreateMetaElement(name: string): Element {
    let el: Element;
    el = document.head.querySelector('meta[name=' + name + ']');
    if (el === null) {
      el = document.createElement('meta');
      el.setAttribute('name', name);
      this.headElement[0].appendChild(el);
    }
    return el;
  }

  // get the current site site
  getTitle(): string {
    return this.titleService.getTitle();
  }

  // set the site title
  setTitle(newTitle: string): void {
    this.titleService.setTitle(newTitle);
  }

  // get the current link icon
  getLinkFavicon(): string {
    return this.favicon.getAttribute('href');
  }

  // set the site link icon
  setLinkFavicon(href: string): void {
    this.favicon.setAttribute('href', href);
  }

  // get the current meta description
  getMetaDescription(): string {
    return this.metaDescription.getAttribute('content');
  }

  // set the meta description
  setMetaDescription(description: string): void {
    this.metaDescription.setAttribute('content', description);
  }

  // get the current meta keywords
  getMetaKeywords(): Array<string> {
    return this.metaKeywords.getAttribute('content').split(',');
  }

  // set the meta keywords
  setMetaKeywords(keywords: Array<string>): void {
    this.metaKeywords.setAttribute('content', keywords.toString());
  }

  setAll(object: any): void {
    if (object.title)
      this.setTitle(object.title);
    if (object.favicon)
      this.setLinkFavicon(object.favicon);
    if (object.description)
      this.setMetaDescription(object.description);
    if (object.keywords)
      this.setMetaKeywords(object.keywords);
  }

}
