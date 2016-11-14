import { Directive, ElementRef, Input, Renderer, HostListener } from '@angular/core';

@Directive({ 
	selector: '[zoomNotScroll]' 
})

export class ZoomDirective {

	

    constructor(private el: ElementRef, private renderer: Renderer) {
       
    }

    @HostListener('window:wheel', ['$event']) 
    scroll(event) {

    	if(event.deltaY < 0 && this.el.nativeElement.style.transform !== `scale(1)`) {
    		this.zoom(1);
    		console.log(1);
    	}
    	if(event.deltaY > 0 && this.el.nativeElement.style.transform !== `scale(0.23)`) {
    		this.zoom(0.23);
    		console.log(0.23);
    	}
    	console.log(event.deltaY);
    }

    private zoom(scale) {
    	this.renderer.setElementStyle(this.el.nativeElement, 'transform', `scale(${scale})`);
    }

}
