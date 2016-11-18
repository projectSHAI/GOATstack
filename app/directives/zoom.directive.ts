import { Directive, ElementRef, Input, Renderer, HostListener, AfterViewInit } from '@angular/core';

@Directive({ 
	selector: '[zoomNotScroll]' 
})

export class ZoomDirective {

    maxZoom: number = 5;
    scrollTop: number = 0;
    windowHeight: number = window.innerHeight;
    windowWidth: number = window.innerWidth;

    aspectRatio: number = this.windowWidth/this.windowHeight;
    scrollPercentage: number = (this.scrollTop / this.windowHeight);

    leftPos: any = (this.scrollPercentage) * -20;
    topPos: any = (this.scrollPercentage) * 100;
    scrollMultiplier: any = 5 - (this.scrollPercentage * 4);

    constructor(private el: ElementRef, private renderer: Renderer) {
       
    }

    @HostListener('window:scroll', ['$event'])
    @HostListener('window:resize', ['$event'])  
    scroll(event) {

        this.windowHeight = window.innerHeight;
        this.windowWidth = window.innerWidth;
        this.scrollTop = document.body.scrollTop;

        this.aspectRatio = this.windowWidth/this.windowHeight;
        this.scrollPercentage = (this.scrollTop / this.windowHeight);
      

        this.aspect(this.aspectRatio);

        this.zoom(this.scrollMultiplier, this.leftPos, this.topPos);


    }

    private zoom(scale, x, y) {

        if(scale >= 1) {
            this.renderer.setElementStyle(this.el.nativeElement, 'transform', `scale(${scale}) translate(${x}vw, ${y}vh)`);
        }
        else if (this.el.nativeElement.style.transform.substring(6,8) !== `1)` ) { 
            this.renderer.setElementStyle(this.el.nativeElement, 'transform', `scale(1) translate(-20vw, ${y}vh)`);
        }
    }

    private aspect(ratio) {
        console.log(ratio);
        if(ratio >= 3) {
            this.scrollMultiplier = 5 - (this.scrollPercentage * 4);
            this.topPos = Math.pow((this.scrollTop / this.windowHeight) * 11.8, 2);
            this.leftPos = (this.scrollPercentage) * -20;
            console.log('yasfo');
        }
        else if(ratio >= 2 && ratio < 3) {
            this.scrollMultiplier = 5 - (this.scrollPercentage * 4);
            this.topPos = Math.pow((this.scrollTop / this.windowHeight) * 11.8, 2);
            this.leftPos = (this.scrollPercentage) * -20;console.log('yvvvvvvo');
        }
        else if(ratio >= 1.5 && ratio < 2) {
            this.scrollMultiplier = 5 - (this.scrollPercentage * 4);
            this.topPos = Math.pow((this.scrollTop / this.windowHeight) * 11.8, 2);
            this.leftPos = (this.scrollPercentage) * -20;
            console.log('yco');
        }
        else if(ratio >= 1 && ratio < 1.5) {
            this.scrollMultiplier = 5 - (this.scrollPercentage * 4);
            this.topPos = Math.pow((this.scrollTop / this.windowHeight) * 11, 2);
            this.leftPos = (this.scrollPercentage) * -20;
            console.log('yovc');
        }
        else if(ratio >= 0 && ratio < 1) {
            this.scrollMultiplier = 13 - (this.scrollPercentage * 12);
            this.topPos = Math.pow((this.scrollTop / this.windowHeight) * 11, 2);
            this.leftPos = (this.scrollPercentage) * -145;
            console.log(this.scrollMultiplier);
        }
    }

}


//trigger the zoom function on resize as well