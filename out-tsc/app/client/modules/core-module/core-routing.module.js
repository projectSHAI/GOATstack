"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
exports.routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: 'profile', redirectTo: '/profile', pathMatch: 'full' },
    { path: '**', redirectTo: '/PageNotFound', pathMatch: 'full' }
];
var CoreRoutingModule = /** @class */ (function () {
    function CoreRoutingModule() {
    }
    return CoreRoutingModule;
}());
exports.CoreRoutingModule = CoreRoutingModule;
