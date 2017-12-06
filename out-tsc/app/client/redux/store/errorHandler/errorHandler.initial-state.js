"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorHandler_transformers_1 = require("./errorHandler.transformers");
// Define the INITIAL_STATE of the error attribute in the store
exports.INITIAL_STATE = errorHandler_transformers_1.reimmutifyError({
    message: '',
});
