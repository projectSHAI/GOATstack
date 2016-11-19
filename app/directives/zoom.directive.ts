import { Directive, ElementRef, Input, Renderer, HostListener, OnInit } from '@angular/core';

declare let TweenMax: any;
declare let TimelineMax: any;
declare let Power0: any;

@Directive({ 
	selector: '[zoomNotScroll]' 
})

export class ZoomDirective {

    maxZoom: number = 5;
    windowWidth: number = window.innerWidth;
    windowHeight: number = window.innerHeight;
    scrollTop: number = document.body.scrollTop;

    scrollPercentage: number = (this.scrollTop / this.windowHeight);
    previousPercentage: number = this.scrollPercentage;
    //expected screen ratio greater than 1 = landscape less than 1 equals portrait
    aspectRatio: number = this.windowWidth/this.windowHeight;

    top: number;
    left: number;


    
    

    // leftPos: any = (this.scrollPercentage) * -20;
    topPos: any = (this.scrollPercentage) * 100;
    // scrollMultiplier: any = 5 - (this.scrollPercentage * 4);

    eleNode: any = this.el.nativeElement;
    landscapeTl: any = new TimelineMax({paused: true});
    portraitTl: any = new TimelineMax({paused: true});

    constructor(private el: ElementRef, private renderer: Renderer) { 
        
    }

    ngOnInit() {

        this.landscapeTl.to(this.eleNode, 1, {scale: 1, x: 0, y: this.windowHeight});

        this.portraitTl.to(this.eleNode, 1, {scale: 1, x: 0, y: this.windowHeight});

    }

    @HostListener('window:resize', ['$event'])  
    @HostListener('window:scroll', ['$event'])
    scroll(event) {

    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.scrollTop = document.body.scrollTop;

    if(this.windowHeight >= this.scrollTop){
        this.scrollPercentage = (this.scrollTop / this.windowHeight);
    }
    else{
        this.scrollPercentage = 1;
    }
        
    this.aspectRatio = this.windowWidth/this.windowHeight;

    if(this.aspectRatio > 1) { 
        this.landscapeTl.tweenFromTo(this.previousPercentage ,this.scrollPercentage);
    } else {
        this.portraitTl.tweenFromTo(this.previousPercentage ,this.scrollPercentage);
    }

    this.previousPercentage = this.scrollPercentage;
    }








//     scroll(event) {

//         this.windowHeight = window.innerHeight;
//         this.windowWidth = window.innerWidth;
//         this.scrollTop = document.body.scrollTop;

//         this.aspectRatio = this.windowWidth/this.windowHeight;
//         this.scrollPercentage = (this.scrollTop / this.windowHeight);
      

//         this.aspect(this.aspectRatio);

//         this.zoom(this.scrollMultiplier, this.leftPos, this.topPos);


//     }

//     private zoom(scale, x, y) {

//         if(scale >= 1) {
//             this.renderer.setElementStyle(this.el.nativeElement, 'transform', `scale(${scale}) translate(${x}vw, ${y}vh)`);
//         }
//         else if (this.el.nativeElement.style.transform.substring(6,8) !== `1)` ) { 
//             this.renderer.setElementStyle(this.el.nativeElement, 'transform', `scale(1) translate(-20vw, ${y}vh)`);
//         }
//     }

//     private aspect(ratio) {
//         console.log(ratio);
//         if(ratio >= 3) {
//             this.scrollMultiplier = 5 - (this.scrollPercentage * 4);
//             this.topPos = Math.pow((this.scrollTop / this.windowHeight) * 11.8, 2);
//             this.leftPos = (this.scrollPercentage) * -20;
//             console.log('yasfo');
//         }
//         else if(ratio >= 2 && ratio < 3) {
//             this.scrollMultiplier = 5 - (this.scrollPercentage * 4);
//             this.topPos = Math.pow((this.scrollTop / this.windowHeight) * 11.8, 2);
//             this.leftPos = (this.scrollPercentage) * -20;console.log('yvvvvvvo');
//         }
//         else if(ratio >= 1.5 && ratio < 2) {
//             this.scrollMultiplier = 5 - (this.scrollPercentage * 4);
//             this.topPos = Math.pow((this.scrollTop / this.windowHeight) * 11.8, 2);
//             this.leftPos = (this.scrollPercentage) * -20;
//             console.log('yco');
//         }
//         else if(ratio >= 1 && ratio < 1.5) {
//             this.scrollMultiplier = 5 - (this.scrollPercentage * 4);
//             this.topPos = Math.pow((this.scrollTop / this.windowHeight) * 11, 2);
//             this.leftPos = (this.scrollPercentage) * -20;
//             console.log('yovc');
//         }
//         else if(ratio >= 0 && ratio < 1) {
//             this.scrollMultiplier = 13 - (this.scrollPercentage * 12);
//             this.topPos = Math.pow((this.scrollTop / this.windowHeight) * 11, 2);
//             this.leftPos = (this.scrollPercentage) * -145;
//             console.log(this.scrollMultiplier);
//         }
//     }

   }


//trigger the zoom function on resize as well