"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var store_1 = require("@angular-redux/store");
var index_1 = require("../../store/index");
/* ErrorHandler Actions: Used to call dispatches to change
      error object in the store

    SHOW_ERROR  ->  updates the error message to display
    HIDE_ERROR  ->  removes error message string
*/
var /* ErrorHandler Actions: Used to call dispatches to change
      error object in the store

    SHOW_ERROR  ->  updates the error message to display
    HIDE_ERROR  ->  removes error message string
*/
ErrorHandlerActions = /** @class */ (function () {
    function ErrorHandlerActions(ngRedux) {
        this.ngRedux = ngRedux;
    }
    ErrorHandlerActions.prototype.showError = function (error) {
        this.ngRedux.dispatch({
            type: ErrorHandlerActions.SHOW_ERROR,
            payload: error
        });
    };
    ErrorHandlerActions.prototype.hideError = function () {
        this.ngRedux.dispatch({ type: ErrorHandlerActions.HIDE_ERROR });
    };
    return ErrorHandlerActions;
}());
exports.ErrorHandlerActions = ErrorHandlerActions;
