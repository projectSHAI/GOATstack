import { Directive, ElementRef, Input, Renderer, HostListener, AfterViewInit } from '@angular/core';

@Directive({ 
	selector: '[zoomNotScroll]' 
})

export class ZoomDirective {

    maxZoom: number = 3.5;
    windowHeight: number = window.innerHeight;
    windowWidth: number = window.innerWidth;
    aspectRatio: number = this.windowWidth/this.windowHeight;

    leftPos: any = (this.scrollTop / this.windowHeight) * -20;
    topPos: any = (this.scrollTop / this.windowHeight) * 100;
	scrollTop: number = 0;
    scrollMultiplier: any = 3.5 - (this.scrollTop / this.windowHeight * 2.5);

    constructor(private el: ElementRef, private renderer: Renderer) {
       
    }

    @HostListener('window:scroll', ['$event']) 
    scroll(event) {

        this.windowHeight = window.innerHeight;
        this.windowWidth = window.innerWidth;
        this.aspectRatio = this.windowWidth/this.windowHeight;

        this.scrollTop = document.body.scrollTop;
        this.scrollMultiplier = 3.5 - (this.scrollTop / this.windowHeight * 2.5);
        this.leftPos = (this.scrollTop / this.windowHeight) * -20;


        this.aspect(this.aspectRatio);

        this.zoom(this.scrollMultiplier, this.leftPos, this.topPos);


    }

    private zoom(scale, x, y) {

        if(scale > 1) {
            this.renderer.setElementStyle(this.el.nativeElement, 'transform', `scale(${scale}) translate(${x}vw, ${y}vh)`);
        }
        else{ }
    	
    }

    private aspect(ratio) {
        if(ratio >= 3) {
            //set the first line with media queries in scss once im done making functions
            this.renderer.setElementStyle(this.el.nativeElement, 'margin-top', `75vh`);
            this.topPos = (this.scrollTop / this.windowHeight) * 125;
        }
        else if(ratio >= 2 && ratio < 3) {
            this.renderer.setElementStyle(this.el.nativeElement, 'margin-top', `35vh`);
            this.topPos = (this.scrollTop / this.windowHeight) * 100;
        }
        else if(ratio >= 1.5 && ratio < 2) {
            this.renderer.setElementStyle(this.el.nativeElement, 'margin-top', `35vh`);
            this.topPos = ((this.scrollTop) / this.windowHeight) * 100;
        }
        else if(ratio >= 0 && ratio < 1.5) {
            this.topPos = ((this.scrollTop) / this.windowHeight) * 100;
        }
    }

}
