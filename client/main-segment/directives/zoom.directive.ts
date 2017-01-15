import { Directive, ElementRef, Input, Renderer, HostListener, OnInit } from '@angular/core';
import { ZoomActions } from '../actions/zoom/zoom.actions';
import { CloudActions } from '../../sky-segment/actions/cloud/cloud.actions';

declare let TweenMax: any;
declare let TimelineMax: any;
declare let Power0: any;

@Directive({ 
	selector: '[zoomNotScroll]',
    providers: [ZoomActions, CloudActions] 
})

export class ZoomDirective {

    windowWidth: number = window.innerWidth;
    windowHeight: number = window.innerHeight;
    scrollTop: number = document.body.scrollTop;
    prevScrollTop: number = this.scrollTop;
    pause: boolean = false;

    //expected screen ratio greater than 1 = landscape less than 1 equals portrait
    aspectRatio: number = this.windowWidth/this.windowHeight;


    oceanNode: any = this.el.nativeElement;
    homeNode: any = this.oceanNode.parentNode;
    landscapeTl: any = new TimelineMax({paused: true});
    portraitTl: any = new TimelineMax({paused: true});

    constructor(
        private el: ElementRef, 
        private renderer: Renderer,
        private zoomActions: ZoomActions,
        private cloudActions: CloudActions) { 
        
    }

    ngOnInit() {
        this.landscapeTl
            .to(this.oceanNode, 1, {scale: 1, x: 0, y: -this.windowHeight / 2, marginBottom: this.windowHeight / 2, z: 0.01})
            .to(this.homeNode, 1, {height: 'auto'});

        this.portraitTl
            .to(this.oceanNode, 1, {scale: 1, x: 0, y: -this.windowHeight / 2, marginBottom: this.windowHeight / 2, z: 0.01})
            .to(this.homeNode, 1, {height: 'auto'});
    }
  
    @HostListener('window:scroll', ['$event'])
    scroll(event) {
        this.prevScrollTop = this.scrollTop;
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.scrollTop = document.body.scrollTop;

        if(this.scrollTop === 0 && this.aspectRatio > 1) {
            this.landscapeTl.reverse(0);
            this.zoomActions.updateShowHide();
        }
        else if(this.scrollTop === 0 && this.aspectRatio < 1) {
            this.portraitTl.reverse(0);
            this.zoomActions.updateShowHide(); 
        }

        if(this.scrollTop <= 1080 && this.pause === true) {
            this.cloudActions.resumeAnima();
            this.pause = false;
        }
        if(this.scrollTop >= 1080 && this.pause === false) {
            this.cloudActions.pauseAnima();
            this.pause = true;
        }

    }

    @HostListener('window:resize', ['$event'])
    resize(event) {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.aspectRatio = this.windowWidth/this.windowHeight;

        this.landscapeTl.clear();
        this.portraitTl.clear();

        this.landscapeTl.to(this.oceanNode, 1, {scale: 1, x: 0, y: -this.windowHeight / 2, marginBottom: this.windowHeight / 2}).to(this.homeNode, 0, {height: 'auto'});
        this.portraitTl.to(this.oceanNode, 1, {scale: 1, x: 0, y: -this.windowHeight / 2, marginBottom: this.windowHeight / 2}).to(this.homeNode, 0, {height: 'auto'});

    }

    zoomOut() {
        if(this.aspectRatio > 1) {
            this.landscapeTl.play(0);
            this.zoomActions.updateShowHide();
        }
        else if(this.aspectRatio < 1) {
            this.portraitTl.play(0);
            this.zoomActions.updateShowHide(); 
        }
    }

}