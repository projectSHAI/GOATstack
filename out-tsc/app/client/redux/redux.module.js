"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var store_1 = require("@angular-redux/store");
var index_1 = require("./store/index");
var redux_logger_1 = require("redux-logger");
var ReduxModule = /** @class */ (function () {
    function ReduxModule(ngRedux, devTool) {
        this.ngRedux = ngRedux;
        this.devTool = devTool;
        // configure the store here, this is where the enhancers are set
        this.ngRedux.configureStore(index_1.rootReducer, {}, core_1.isDevMode() ? [redux_logger_1.createLogger({ collapsed: true })] : [], core_1.isDevMode() && devTool.isEnabled() ? index_1.enhancers.concat([devTool.enhancer()]) : index_1.enhancers.slice());
    }
    return ReduxModule;
}());
exports.ReduxModule = ReduxModule;
