"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var store_1 = require("@angular-redux/store");
var errorHandler_actions_1 = require("../../redux/actions/error/errorHandler.actions");
var seo_actions_1 = require("../../redux/actions/seo/seo.actions");
var Observable_1 = require("rxjs/Observable");
var CoreComponent = /** @class */ (function () {
    function CoreComponent(errorHandler, el, ref) {
        this.errorHandler = errorHandler;
        this.el = el;
        this.ref = ref;
    }
    CoreComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.manuContainer = this.el.nativeElement.parentElement.children[0].children[0].children[1];
        // initialize error handling animation timeline
        this.errorTimeline = new TimelineMax({ paused: true });
        this.errorTimeline
            .to(this.errorToast.nativeElement, 0, { display: 'block', y: 400 })
            .to(this.errorToast.nativeElement, 1, { y: 0 })
            .to(this.errorToast.nativeElement, 1, { y: 400, display: 'none' }, "+=3")
            .add(function () { return _this.errorHandler.hideError(); });
        // Let the component be in charge of triggering the animation
        this.error$.subscribe(function (error) { return error.get('message') ? _this.errorTimeline.play(0) : null; });
    };
    __decorate([
        store_1.select('error'),
        __metadata("design:type", Object)
    ], CoreComponent.prototype, "error$", void 0);
    __decorate([
        store_1.select('userForm'),
        __metadata("design:type", Object)
    ], CoreComponent.prototype, "userForm$", void 0);
    return CoreComponent;
}());
exports.CoreComponent = CoreComponent;
