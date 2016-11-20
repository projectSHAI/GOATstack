import { Directive, ElementRef, Input, Renderer, HostListener, OnInit } from '@angular/core';

declare let TweenMax: any;
declare let TimelineMax: any;
declare let Power0: any;

@Directive({ 
	selector: '[zoomNotScroll]' 
})

export class ZoomDirective {

    windowWidth: number;
    windowHeight: number = window.innerHeight;
    scrollTop: number;

    //expected screen ratio greater than 1 = landscape less than 1 equals portrait
    aspectRatio: number;


    eleNode: any = this.el.nativeElement;
    landscapeTl: any = new TimelineMax({paused: true});
    portraitTl: any = new TimelineMax({paused: true});

    constructor(private el: ElementRef, private renderer: Renderer) { 
        
    }

    ngOnInit() {
        this.landscapeTl.to(this.eleNode, 1, {scale: 1, x: 0, y: this.windowHeight / 2});

        this.portraitTl.to(this.eleNode, 1, {scale: 1, x: 0, y: this.windowHeight / 2});
    }

    @HostListener('window:resize', ['$event'])  
    @HostListener('window:scroll', ['$event'])
    scroll(event) {

    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.scrollTop = document.body.scrollTop;
    this.aspectRatio = this.windowWidth/this.windowHeight;

    if(this.aspectRatio > 1) { 
        this.scrollTop !== 0 ? this.landscapeTl.play() : this.landscapeTl.reverse(0);
    } else {
        this.scrollTop !== 0 ? this.portraitTl.play() : this.portraitTl.reverse(0);
    }
    
    }

}