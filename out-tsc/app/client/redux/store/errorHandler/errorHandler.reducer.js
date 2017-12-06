"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandler_actions_1 = require("../../actions/error/errorHandler.actions");
var errorHandler_transformers_1 = require("./errorHandler.transformers");
var errorHandler_types_1 = require("./errorHandler.types");
var errorHandler_initial_state_1 = require("./errorHandler.initial-state");
// define the reducer for error attribute in store
function errorHandlerReducer(state, action) {
    if (state === void 0) { state = errorHandler_initial_state_1.INITIAL_STATE; }
    // Depending on the incoming state 'type' execute corresponding state change
    switch (action.type) {
        case errorHandler_actions_1.ErrorHandlerActions.SHOW_ERROR:
            return state.updateIn(['message'], function (val) { return action.payload; });
        case errorHandler_actions_1.ErrorHandlerActions.HIDE_ERROR:
            return state.updateIn(['message'], function (val) { return ''; });
        default:
            return state;
    }
}
exports.errorHandlerReducer = errorHandlerReducer;
