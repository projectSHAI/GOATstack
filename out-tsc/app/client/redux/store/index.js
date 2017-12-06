"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
// import persistState from 'redux-localStorage';
var error = require("./errorHandler/index");
// DO NOT REMOVE: template store imports
// IAppState is the applications store where all persistant data
// should be stored
var 
// DO NOT REMOVE: template store imports
// IAppState is the applications store where all persistant data
// should be stored
IAppState = /** @class */ (function () {
    function IAppState() {
    }
    return IAppState;
}());
exports.IAppState = IAppState;
;
// Each reducer is connected to a coresponding store attribute
// combineReducers() creates a root reducer while maintaining
// this one-2-one relationship
exports.rootReducer = redux_1.combineReducers({
    error: error.errorHandlerReducer,
});
// Redux plugins/enhancers go here
exports.enhancers = [];
