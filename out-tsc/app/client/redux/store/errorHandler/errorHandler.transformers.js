"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var immutable_1 = require("immutable");
var errorHandler_types_1 = require("./errorHandler.types");
// functions to change the state of the data
// either immutable -> mutable or mutable -> immutable
function deimmutifyError(state) {
    return state.toJS();
}
exports.deimmutifyError = deimmutifyError;
function reimmutifyError(plain) {
    return immutable_1.Map(plain ? plain : '');
}
exports.reimmutifyError = reimmutifyError;
