import { Directive, ElementRef, Input, Renderer, HostListener } from '@angular/core';

@Directive({ 
	selector: '[zoomNotScroll]' 
})

export class ZoomDirective {

    maxZoom: number = 3.5;
    leftPos: any = 900 - (this.scrollTop);
    topPos: any = (this.scrollTop);
	scrollTop: number = 0;
    scrollMultiplier: any = 3.5 - (this.scrollTop / 900 * 2.5);

    constructor(private el: ElementRef, private renderer: Renderer) {
       
    }

    @HostListener('window:scroll', ['$event']) 
    scroll(event) {

        this.scrollTop = document.body.scrollTop;
        this.scrollMultiplier = 3.5 - (this.scrollTop / 900 * 2.5);
        this.leftPos = 900 - (this.scrollTop);
        this.topPos = (this.scrollTop);
        console.log(this.scrollMultiplier);
    	if(this.scrollMultiplier > 1) {
    		this.zoom(this.scrollMultiplier, this.leftPos, this.topPos);
    	}
    	else{

        }
    }

    private zoom(scale, x, y) {
        this.renderer.setElementStyle(this.el.nativeElement, 'top', `${y}px`);
        this.renderer.setElementStyle(this.el.nativeElement, 'left', `${x}px`);
    	this.renderer.setElementStyle(this.el.nativeElement, 'transform', `scale(${scale})`);
    }

}
