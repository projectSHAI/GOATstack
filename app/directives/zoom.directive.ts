import { Directive, ElementRef, Input, Renderer, HostListener } from '@angular/core';

@Directive({ 
	selector: '[zoomNotScroll]' 
})

export class ZoomDirective {

    constructor(el: ElementRef, renderer: Renderer) {
       
    }

    @HostListener('window:scroll', ['$event']) 
    doSomething(event) {
      console.debug("Scroll Event", document.body.scrollTop);
    }

}
