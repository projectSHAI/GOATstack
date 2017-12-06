"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var shared_module_1 = require("../shared-module/shared.module");
var core_routing_module_1 = require("./core-routing.module");
var home_module_1 = require("../feature-modules/view-modules/home/home.module");
var user_profile_module_1 = require("../feature-modules/view-modules/user-profile/user-profile.module");
var _404_module_1 = require("../feature-modules/view-modules/404/404.module");
var angular_material_module_1 = require("../feature-modules/extension-modules/angular-material/angular-material.module");
var core_component_1 = require("./core.component");
var header_component_1 = require("./components/header/header.component");
var footer_component_1 = require("./components/footer/footer.component");
var errorHandler_actions_1 = require("../../redux/actions/error/errorHandler.actions");
var seo_actions_1 = require("../../redux/actions/seo/seo.actions");
//3rd party imports
var ng2_cookies_1 = require("ng2-cookies/ng2-cookies");
var index_1 = require("../../redux/store/index");
var CoreModule = /** @class */ (function () {
    function CoreModule(parentModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Do not lazyLoad this module');
        }
    }
    return CoreModule;
}());
exports.CoreModule = CoreModule;
