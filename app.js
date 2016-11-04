var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("client/app/actions/error/errorHandler.actions", ['@angular/core', 'ng2-redux'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, ng2_redux_1;
    var ErrorHandlerActions;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ng2_redux_1_1) {
                ng2_redux_1 = ng2_redux_1_1;
            }],
        execute: function() {
            ErrorHandlerActions = (function () {
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
                ErrorHandlerActions.SHOW_ERROR = 'SHOW_ERROR';
                ErrorHandlerActions.HIDE_ERROR = 'HIDE_ERROR';
                ErrorHandlerActions.decorators = [
                    { type: core_1.Injectable },
                ];
                /** @nocollapse */
                ErrorHandlerActions.ctorParameters = [
                    { type: ng2_redux_1.NgRedux, },
                ];
                return ErrorHandlerActions;
            }());
            exports_1("ErrorHandlerActions", ErrorHandlerActions);
        }
    }
});
System.register("client/app/store/errorHandler/errorHandler.types", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("client/app/store/errorHandler/errorHandler.transformers", ['immutable'], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var immutable_1;
    function deimmutifyError(state) {
        return state.toJS();
    }
    exports_3("deimmutifyError", deimmutifyError);
    function reimmutifyError(plain) {
        return immutable_1.Map(plain ? plain : '');
    }
    exports_3("reimmutifyError", reimmutifyError);
    return {
        setters:[
            function (immutable_1_1) {
                immutable_1 = immutable_1_1;
            }],
        execute: function() {
        }
    }
});
System.register("client/app/store/errorHandler/errorHandler.initial-state", ["client/app/store/errorHandler/errorHandler.transformers"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var errorHandler_transformers_1;
    var INITIAL_STATE;
    return {
        setters:[
            function (errorHandler_transformers_1_1) {
                errorHandler_transformers_1 = errorHandler_transformers_1_1;
            }],
        execute: function() {
            exports_4("INITIAL_STATE", INITIAL_STATE = errorHandler_transformers_1.reimmutifyError({
                message: '',
            }));
        }
    }
});
System.register("client/app/store/errorHandler/errorHandler.reducer", ["client/app/actions/error/errorHandler.actions", "client/app/store/errorHandler/errorHandler.initial-state"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var errorHandler_actions_1, errorHandler_initial_state_1;
    function errorHandlerReducer(state, action) {
        if (state === void 0) { state = errorHandler_initial_state_1.INITIAL_STATE; }
        switch (action.type) {
            case errorHandler_actions_1.ErrorHandlerActions.SHOW_ERROR:
                return state.updateIn(['message'], function (val) { return action.payload; });
            case errorHandler_actions_1.ErrorHandlerActions.HIDE_ERROR:
                return state.updateIn(['message'], function (val) { return ''; });
            default:
                return state;
        }
    }
    exports_5("errorHandlerReducer", errorHandlerReducer);
    return {
        setters:[
            function (errorHandler_actions_1_1) {
                errorHandler_actions_1 = errorHandler_actions_1_1;
            },
            function (errorHandler_initial_state_1_1) {
                errorHandler_initial_state_1 = errorHandler_initial_state_1_1;
            }],
        execute: function() {
        }
    }
});
System.register("client/app/store/errorHandler/index", ["client/app/store/errorHandler/errorHandler.reducer", "client/app/store/errorHandler/errorHandler.transformers"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var errorHandler_reducer_1, errorHandler_transformers_2;
    return {
        setters:[
            function (errorHandler_reducer_1_1) {
                errorHandler_reducer_1 = errorHandler_reducer_1_1;
            },
            function (errorHandler_transformers_2_1) {
                errorHandler_transformers_2 = errorHandler_transformers_2_1;
            }],
        execute: function() {
            exports_6("errorHandlerReducer", errorHandler_reducer_1.errorHandlerReducer);
            exports_6("deimmutifyError", errorHandler_transformers_2.deimmutifyError);
            exports_6("reimmutifyError", errorHandler_transformers_2.reimmutifyError);
        }
    }
});
System.register("client/app/services/user/user.service", ['@angular/core', '@angular/http', 'rxjs/Observable', 'ng2-cookies/ng2-cookies', 'rxjs/Rx'], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var core_2, http_1, Observable_1, ng2_cookies_1;
    var UserService;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (ng2_cookies_1_1) {
                ng2_cookies_1 = ng2_cookies_1_1;
            },
            function (_1) {}],
        execute: function() {
            UserService = (function () {
                function UserService(http) {
                    this.http = http;
                    // Private variables that only this service can use
                    this.authUrl = 'auth/local';
                    this.userUrl = 'api/users';
                }
                UserService.prototype.extractToken = function (res) {
                    var body = res.json();
                    ng2_cookies_1.Cookie.set('token', body.token);
                    return body.user;
                };
                UserService.prototype.handleError = function (error) {
                    // In a real world app, we might use a remote logging infrastructure
                    // We'd also dig deeper into the error to get a better message
                    var body = JSON.parse(error._body);
                    var errMsg;
                    if (body.errors) {
                        errMsg = body.errors.userName ? body.errors.userName : body.errors.email;
                    }
                    else {
                        errMsg = body ? body :
                            error.status ? error.status + " - " + error.statusText : 'Server error';
                    }
                    return Observable_1.Observable.throw(errMsg.message);
                };
                // Public functions that components may call
                UserService.prototype.getMe = function () {
                    return this.http.get(this.userUrl + '/me')
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                UserService.prototype.login = function (email, password) {
                    var body = JSON.stringify({
                        email: email,
                        password: password
                    });
                    return this.http.post(this.authUrl, body)
                        .map(this.extractToken)
                        .catch(this.handleError);
                };
                UserService.prototype.signup = function (username, email, password) {
                    var body = JSON.stringify({
                        userName: username,
                        email: email,
                        password: password
                    });
                    return this.http.post(this.userUrl, body)
                        .map(this.extractToken)
                        .catch(this.handleError);
                };
                UserService.decorators = [
                    { type: core_2.Injectable },
                ];
                /** @nocollapse */
                UserService.ctorParameters = [
                    { type: http_1.Http, },
                ];
                return UserService;
            }());
            exports_7("UserService", UserService);
        }
    }
});
System.register("client/app/actions/userForm/userForm.actions", ['@angular/core', 'ng2-redux'], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var core_3, ng2_redux_2;
    var UserFormActions;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (ng2_redux_2_1) {
                ng2_redux_2 = ng2_redux_2_1;
            }],
        execute: function() {
            UserFormActions = (function () {
                function UserFormActions(ngRedux) {
                    this.ngRedux = ngRedux;
                    this.userSigning = false;
                    this.userSignup = false;
                }
                UserFormActions.prototype.loginForm = function (action) {
                    if (action)
                        this.ngRedux.dispatch({ type: UserFormActions.LOGIN_FORM_IN });
                    else
                        this.ngRedux.dispatch({ type: UserFormActions.LOGIN_FORM_OUT });
                };
                UserFormActions.prototype.registerForm = function (action) {
                    if (action)
                        this.ngRedux.dispatch({ type: UserFormActions.REGISTER_FORM_IN });
                    else
                        this.ngRedux.dispatch({ type: UserFormActions.REGISTER_FORM_OUT });
                };
                UserFormActions.LOGIN_FORM_IN = 'LOGIN_FORM_IN';
                UserFormActions.LOGIN_FORM_OUT = 'LOGIN_FORM_OUT';
                UserFormActions.REGISTER_FORM_IN = 'REGISTER_FORM_IN';
                UserFormActions.REGISTER_FORM_OUT = 'REGISTER_FORM_OUT';
                UserFormActions.decorators = [
                    { type: core_3.Injectable },
                ];
                /** @nocollapse */
                UserFormActions.ctorParameters = [
                    { type: ng2_redux_2.NgRedux, },
                ];
                return UserFormActions;
            }());
            exports_8("UserFormActions", UserFormActions);
        }
    }
});
System.register("client/app/store/userForm/userForm.types", [], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("client/app/store/userForm/userForm.transformers", ['immutable'], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var immutable_2;
    function deimmutifyUserForm(state) {
        return state.toJS();
    }
    exports_10("deimmutifyUserForm", deimmutifyUserForm);
    function reimmutifyUserForm(plain) {
        return immutable_2.Map(plain ? plain : {});
    }
    exports_10("reimmutifyUserForm", reimmutifyUserForm);
    return {
        setters:[
            function (immutable_2_1) {
                immutable_2 = immutable_2_1;
            }],
        execute: function() {
        }
    }
});
System.register("client/app/store/userForm/userForm.initial-state", ["client/app/store/userForm/userForm.transformers"], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var userForm_transformers_1;
    var INITIAL_STATE;
    return {
        setters:[
            function (userForm_transformers_1_1) {
                userForm_transformers_1 = userForm_transformers_1_1;
            }],
        execute: function() {
            exports_11("INITIAL_STATE", INITIAL_STATE = userForm_transformers_1.reimmutifyUserForm({
                userSigning: false,
                userSignup: false
            }));
        }
    }
});
System.register("client/app/store/userForm/userForm.reducer", ["client/app/actions/userForm/userForm.actions", "client/app/store/userForm/userForm.initial-state"], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var userForm_actions_1, userForm_initial_state_1;
    function userFormReducer(state, action) {
        if (state === void 0) { state = userForm_initial_state_1.INITIAL_STATE; }
        switch (action.type) {
            case userForm_actions_1.UserFormActions.LOGIN_FORM_IN:
                return state
                    .updateIn(['userSigning'], function (val) { return true; })
                    .updateIn(['userSignup'], function (val) { return false; });
            case userForm_actions_1.UserFormActions.REGISTER_FORM_IN:
                return state
                    .updateIn(['userSigning'], function (val) { return false; })
                    .updateIn(['userSignup'], function (val) { return true; });
            case userForm_actions_1.UserFormActions.LOGIN_FORM_OUT:
            case userForm_actions_1.UserFormActions.REGISTER_FORM_OUT:
                return state
                    .updateIn(['userSignup'], function (val) { return false; })
                    .updateIn(['userSigning'], function (val) { return false; });
            default:
                return state;
        }
    }
    exports_12("userFormReducer", userFormReducer);
    return {
        setters:[
            function (userForm_actions_1_1) {
                userForm_actions_1 = userForm_actions_1_1;
            },
            function (userForm_initial_state_1_1) {
                userForm_initial_state_1 = userForm_initial_state_1_1;
            }],
        execute: function() {
        }
    }
});
System.register("client/app/store/userForm/index", ["client/app/store/userForm/userForm.reducer", "client/app/store/userForm/userForm.transformers"], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var userForm_reducer_1, userForm_transformers_2;
    return {
        setters:[
            function (userForm_reducer_1_1) {
                userForm_reducer_1 = userForm_reducer_1_1;
            },
            function (userForm_transformers_2_1) {
                userForm_transformers_2 = userForm_transformers_2_1;
            }],
        execute: function() {
            exports_13("userFormReducer", userForm_reducer_1.userFormReducer);
            exports_13("deimmutifyUserForm", userForm_transformers_2.deimmutifyUserForm);
            exports_13("reimmutifyUserForm", userForm_transformers_2.reimmutifyUserForm);
        }
    }
});
System.register("client/app/actions/user/user.actions", ['@angular/core', 'ng2-redux', "client/app/services/user/user.service", "client/app/actions/error/errorHandler.actions", 'ng2-cookies/ng2-cookies'], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var core_4, ng2_redux_3, user_service_1, errorHandler_actions_2, ng2_cookies_2;
    var UserActions;
    return {
        setters:[
            function (core_4_1) {
                core_4 = core_4_1;
            },
            function (ng2_redux_3_1) {
                ng2_redux_3 = ng2_redux_3_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (errorHandler_actions_2_1) {
                errorHandler_actions_2 = errorHandler_actions_2_1;
            },
            function (ng2_cookies_2_1) {
                ng2_cookies_2 = ng2_cookies_2_1;
            }],
        execute: function() {
            UserActions = (function () {
                function UserActions(ngRedux, errorHandler, userService) {
                    this.ngRedux = ngRedux;
                    this.errorHandler = errorHandler;
                    this.userService = userService;
                }
                UserActions.prototype.getMe = function () {
                    var _this = this;
                    if (ng2_cookies_2.Cookie.get('token'))
                        this.userService.getMe().subscribe(function (user) {
                            _this.ngRedux.dispatch({
                                type: UserActions.LOGIN_USER,
                                payload: user
                            });
                        });
                };
                UserActions.prototype.login = function (lf) {
                    var _this = this;
                    if (lf.valid) {
                        this.userService.login(lf.value.login_email, lf.value.login_password)
                            .subscribe(function (user) {
                            _this.ngRedux.dispatch({
                                type: UserActions.LOGIN_USER,
                                payload: user
                            });
                        }, function (err) { return _this.errorHandler.showError(err); });
                    }
                };
                UserActions.prototype.logout = function () {
                    ng2_cookies_2.Cookie.delete('token');
                    this.ngRedux.dispatch({ type: UserActions.LOGOUT_USER });
                };
                UserActions.prototype.register = function (rf) {
                    var _this = this;
                    if (rf.valid && (rf.value.signup_password === rf.value.signup_re_password)) {
                        this.userService.signup(rf.value.signup_username, rf.value.signup_email, rf.value.signup_password)
                            .subscribe(function (user) {
                            _this.ngRedux.dispatch({
                                type: UserActions.REGISTER_USER,
                                payload: user
                            });
                        }, function (err) { return _this.errorHandler.showError(err); });
                    }
                    else if (rf.value.signup_password !== rf.value.signup_re_password)
                        this.errorHandler.showError('Inputted passwords are not the same!');
                };
                UserActions.LOGIN_USER = 'LOGIN_USER';
                UserActions.LOGOUT_USER = 'LOGOUT_USER';
                UserActions.REGISTER_USER = 'REGISTER_USER';
                UserActions.decorators = [
                    { type: core_4.Injectable },
                ];
                /** @nocollapse */
                UserActions.ctorParameters = [
                    { type: ng2_redux_3.NgRedux, },
                    { type: errorHandler_actions_2.ErrorHandlerActions, },
                    { type: user_service_1.UserService, },
                ];
                return UserActions;
            }());
            exports_14("UserActions", UserActions);
        }
    }
});
System.register("client/app/store/user/user.types", [], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("client/app/store/user/user.transformers", ['immutable'], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var immutable_3;
    function deimmutifyUser(state) {
        return state.toJS();
    }
    exports_16("deimmutifyUser", deimmutifyUser);
    function reimmutifyUser(plain) {
        return immutable_3.Map(plain ? plain : {});
    }
    exports_16("reimmutifyUser", reimmutifyUser);
    return {
        setters:[
            function (immutable_3_1) {
                immutable_3 = immutable_3_1;
            }],
        execute: function() {
        }
    }
});
System.register("client/app/store/user/user.initial-state", ["client/app/store/user/user.transformers"], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var user_transformers_1;
    var INITIAL_STATE;
    return {
        setters:[
            function (user_transformers_1_1) {
                user_transformers_1 = user_transformers_1_1;
            }],
        execute: function() {
            exports_17("INITIAL_STATE", INITIAL_STATE = user_transformers_1.reimmutifyUser({}));
        }
    }
});
System.register("client/app/store/user/user.reducer", ["client/app/actions/user/user.actions", "client/app/store/user/user.transformers", "client/app/store/user/user.initial-state"], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var user_actions_1, user_transformers_2, user_initial_state_1;
    function userReducer(state, action) {
        if (state === void 0) { state = user_initial_state_1.INITIAL_STATE; }
        switch (action.type) {
            case user_actions_1.UserActions.LOGIN_USER:
            case user_actions_1.UserActions.REGISTER_USER:
                // Indead of return a new Map, have immutable manage
                // what happens to the old object by merging
                return state.mergeWith(function (prev, next) { return next; }, user_transformers_2.reimmutifyUser(action.payload));
            case user_actions_1.UserActions.LOGOUT_USER:
                return state.clear();
            default:
                return state;
        }
    }
    exports_18("userReducer", userReducer);
    return {
        setters:[
            function (user_actions_1_1) {
                user_actions_1 = user_actions_1_1;
            },
            function (user_transformers_2_1) {
                user_transformers_2 = user_transformers_2_1;
            },
            function (user_initial_state_1_1) {
                user_initial_state_1 = user_initial_state_1_1;
            }],
        execute: function() {
        }
    }
});
System.register("client/app/store/user/index", ["client/app/store/user/user.reducer", "client/app/store/user/user.transformers"], function(exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var user_reducer_1, user_transformers_3;
    return {
        setters:[
            function (user_reducer_1_1) {
                user_reducer_1 = user_reducer_1_1;
            },
            function (user_transformers_3_1) {
                user_transformers_3 = user_transformers_3_1;
            }],
        execute: function() {
            exports_19("userReducer", user_reducer_1.userReducer);
            exports_19("deimmutifyUser", user_transformers_3.deimmutifyUser);
            exports_19("reimmutifyUser", user_transformers_3.reimmutifyUser);
        }
    }
});
System.register("client/app/store/cloud/cloud.types", [], function(exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("client/app/store/cloud/cloud.transformers", ['immutable'], function(exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var immutable_4;
    function deimmutifyCloudStyle(state) {
        return state.toJS();
    }
    exports_21("deimmutifyCloudStyle", deimmutifyCloudStyle);
    function reimmutifyCloudStyle(plain) {
        return immutable_4.List(plain ? plain : []);
    }
    exports_21("reimmutifyCloudStyle", reimmutifyCloudStyle);
    function deimmutifyAnimaArray(state) {
        return state.toJS();
    }
    exports_21("deimmutifyAnimaArray", deimmutifyAnimaArray);
    function reimmutifyAnimaArray(plain) {
        return immutable_4.List(plain ? plain : []);
    }
    exports_21("reimmutifyAnimaArray", reimmutifyAnimaArray);
    return {
        setters:[
            function (immutable_4_1) {
                immutable_4 = immutable_4_1;
            }],
        execute: function() {
        }
    }
});
System.register("client/app/store/cloud/cloud.initial-state", ["client/app/store/cloud/cloud.transformers"], function(exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var cloud_transformers_1;
    var STYLE_INITIAL_STATE, ANIMA_INITIAL_STATE;
    return {
        setters:[
            function (cloud_transformers_1_1) {
                cloud_transformers_1 = cloud_transformers_1_1;
            }],
        execute: function() {
            exports_22("STYLE_INITIAL_STATE", STYLE_INITIAL_STATE = cloud_transformers_1.reimmutifyCloudStyle([]));
            exports_22("ANIMA_INITIAL_STATE", ANIMA_INITIAL_STATE = cloud_transformers_1.reimmutifyAnimaArray([]));
        }
    }
});
System.register("client/app/store/cloud/cloud.reducer", ["client/app/actions/cloud/cloud.actions", "client/app/store/cloud/cloud.initial-state"], function(exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var cloud_actions_1, cloud_initial_state_1;
    function cloudReducer(state, action) {
        if (state === void 0) { state = cloud_initial_state_1.STYLE_INITIAL_STATE; }
        switch (action.type) {
            case cloud_actions_1.CloudActions.CHANGE_STYLES:
                return state.size < 10 ? state.push(action.payload.asset) :
                    state.update(action.payload.index, function (val) { return action.payload.asset; });
            default:
                return state;
        }
    }
    exports_23("cloudReducer", cloudReducer);
    function animaReducer(state, action) {
        if (state === void 0) { state = cloud_initial_state_1.ANIMA_INITIAL_STATE; }
        switch (action.type) {
            case cloud_actions_1.CloudActions.CHANGE_ANIMA:
                return state.size < 10 ? state.push(action.payload.timeline) :
                    state.updateIn([action.payload.index], function (val) { return action.payload.timeline; });
            default:
                return state;
        }
    }
    exports_23("animaReducer", animaReducer);
    return {
        setters:[
            function (cloud_actions_1_1) {
                cloud_actions_1 = cloud_actions_1_1;
            },
            function (cloud_initial_state_1_1) {
                cloud_initial_state_1 = cloud_initial_state_1_1;
            }],
        execute: function() {
        }
    }
});
System.register("client/app/store/cloud/index", ["client/app/store/cloud/cloud.reducer", "client/app/store/cloud/cloud.transformers"], function(exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var cloud_reducer_1, cloud_transformers_2;
    return {
        setters:[
            function (cloud_reducer_1_1) {
                cloud_reducer_1 = cloud_reducer_1_1;
            },
            function (cloud_transformers_2_1) {
                cloud_transformers_2 = cloud_transformers_2_1;
            }],
        execute: function() {
            exports_24("cloudReducer", cloud_reducer_1.cloudReducer);
            exports_24("animaReducer", cloud_reducer_1.animaReducer);
            exports_24("deimmutifyCloudStyle", cloud_transformers_2.deimmutifyCloudStyle);
            exports_24("reimmutifyCloudStyle", cloud_transformers_2.reimmutifyCloudStyle);
            exports_24("deimmutifyAnimaArray", cloud_transformers_2.deimmutifyAnimaArray);
            exports_24("reimmutifyAnimaArray", cloud_transformers_2.reimmutifyAnimaArray);
        }
    }
});
System.register("client/app/store/wonder/wonder.types", ['immutable'], function(exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    var immutable_5;
    var WonderRecord;
    return {
        setters:[
            function (immutable_5_1) {
                immutable_5 = immutable_5_1;
            }],
        execute: function() {
            exports_25("WonderRecord", WonderRecord = immutable_5.Record({
                _id: '',
                created: '',
                name: '',
                xcoor: 0,
                ycoor: 0
            }));
        }
    }
});
System.register("client/app/services/wonder/wonder.service", ['@angular/core', '@angular/http', 'rxjs/Observable'], function(exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var core_5, http_2, Observable_2;
    var WonderService;
    return {
        setters:[
            function (core_5_1) {
                core_5 = core_5_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
            },
            function (Observable_2_1) {
                Observable_2 = Observable_2_1;
            }],
        execute: function() {
            WonderService = (function () {
                function WonderService(http) {
                    this.http = http;
                    this.url = 'api/wonders';
                }
                WonderService.prototype.handleError = function (error) {
                    // In a real world app, we might use a remote logging infrastructure
                    // We'd also dig deeper into the error to get a better message
                    var body = JSON.parse(error._body);
                    var errMsg = (body.message) ? body.message :
                        error.status ? error.status + " - " + error.statusText : 'Server error';
                    return Observable_2.Observable.throw(errMsg);
                };
                WonderService.prototype.getWonders = function () {
                    return this.http.get(this.url)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                WonderService.prototype.saveWonder = function (wonder) {
                    var body = JSON.stringify({
                        name: wonder
                    });
                    return this.http.post(this.url, body)
                        .map(function (res) { return res.json(); })
                        .catch(this.handleError);
                };
                WonderService.decorators = [
                    { type: core_5.Injectable },
                ];
                /** @nocollapse */
                WonderService.ctorParameters = [
                    { type: http_2.Http, },
                ];
                return WonderService;
            }());
            exports_26("WonderService", WonderService);
        }
    }
});
System.register("client/app/actions/wonder/wonder.actions", ['@angular/core', 'ng2-redux', "client/app/services/wonder/wonder.service", "client/app/actions/error/errorHandler.actions"], function(exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    var core_6, ng2_redux_4, wonder_service_1, errorHandler_actions_3;
    var WonderActions;
    return {
        setters:[
            function (core_6_1) {
                core_6 = core_6_1;
            },
            function (ng2_redux_4_1) {
                ng2_redux_4 = ng2_redux_4_1;
            },
            function (wonder_service_1_1) {
                wonder_service_1 = wonder_service_1_1;
            },
            function (errorHandler_actions_3_1) {
                errorHandler_actions_3 = errorHandler_actions_3_1;
            }],
        execute: function() {
            WonderActions = (function () {
                function WonderActions(ngRedux, errorHandler, wonderService) {
                    this.ngRedux = ngRedux;
                    this.errorHandler = errorHandler;
                    this.wonderService = wonderService;
                }
                WonderActions.prototype.initWonders = function (wonders) {
                    this.ngRedux.dispatch({ type: WonderActions.INITIALIZE_WONDERS, payload: wonders });
                };
                WonderActions.prototype.changeWonder = function (item, index) {
                    this.ngRedux.dispatch({ type: WonderActions.CHANGE_WONDERS, payload: { index: index, object: item } });
                };
                WonderActions.prototype.saveWonder = function (wonder) {
                    var _this = this;
                    this.wonderService.saveWonder(wonder).subscribe(function (wonder) { }, function (error) { return _this.errorHandler.showError(error); });
                };
                WonderActions.INITIALIZE_WONDERS = 'INITIALIZE_WONDERS';
                WonderActions.CHANGE_WONDERS = 'CHANGE_WONDERS';
                WonderActions.decorators = [
                    { type: core_6.Injectable },
                ];
                /** @nocollapse */
                WonderActions.ctorParameters = [
                    { type: ng2_redux_4.NgRedux, },
                    { type: errorHandler_actions_3.ErrorHandlerActions, },
                    { type: wonder_service_1.WonderService, },
                ];
                return WonderActions;
            }());
            exports_27("WonderActions", WonderActions);
        }
    }
});
System.register("client/app/store/wonder/wonder.transformers", ["client/app/store/wonder/wonder.types", 'immutable'], function(exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    var wonder_types_1, immutable_6;
    function deimmutifyWonder(state) {
        return state.toJS();
    }
    exports_28("deimmutifyWonder", deimmutifyWonder);
    function reimmutifyWonder(plain) {
        return immutable_6.List(plain ? plain.map(wonder_types_1.WonderRecord) : []);
    }
    exports_28("reimmutifyWonder", reimmutifyWonder);
    return {
        setters:[
            function (wonder_types_1_1) {
                wonder_types_1 = wonder_types_1_1;
            },
            function (immutable_6_1) {
                immutable_6 = immutable_6_1;
            }],
        execute: function() {
        }
    }
});
System.register("client/app/store/wonder/wonder.initial-state", ["client/app/store/wonder/wonder.transformers"], function(exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    var wonder_transformers_1;
    var INITIAL_STATE;
    return {
        setters:[
            function (wonder_transformers_1_1) {
                wonder_transformers_1 = wonder_transformers_1_1;
            }],
        execute: function() {
            exports_29("INITIAL_STATE", INITIAL_STATE = wonder_transformers_1.reimmutifyWonder([]));
        }
    }
});
System.register("client/app/store/wonder/wonder.reducer", ["client/app/actions/wonder/wonder.actions", "client/app/store/wonder/wonder.transformers", "client/app/store/wonder/wonder.initial-state"], function(exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    var wonder_actions_1, wonder_transformers_2, wonder_initial_state_1;
    function wonderReducer(state, action) {
        if (state === void 0) { state = wonder_initial_state_1.INITIAL_STATE; }
        switch (action.type) {
            case wonder_actions_1.WonderActions.INITIALIZE_WONDERS:
                return state.mergeWith(function (prev, next) { return next; }, wonder_transformers_2.reimmutifyWonder(action.payload));
            case wonder_actions_1.WonderActions.CHANGE_WONDERS:
                return state
                    .updateIn([action.payload.index, '_id'], function (val) { return action.payload.object._id; })
                    .updateIn([action.payload.index, 'created'], function (val) { return action.payload.object.created; })
                    .updateIn([action.payload.index, 'name'], function (val) { return action.payload.object.name; })
                    .updateIn([action.payload.index, 'xcoor'], function (val) { return action.payload.object.xcoor; })
                    .updateIn([action.payload.index, 'ycoor'], function (val) { return action.payload.object.ycoor; });
            default:
                return state;
        }
    }
    exports_30("wonderReducer", wonderReducer);
    return {
        setters:[
            function (wonder_actions_1_1) {
                wonder_actions_1 = wonder_actions_1_1;
            },
            function (wonder_transformers_2_1) {
                wonder_transformers_2 = wonder_transformers_2_1;
            },
            function (wonder_initial_state_1_1) {
                wonder_initial_state_1 = wonder_initial_state_1_1;
            }],
        execute: function() {
        }
    }
});
System.register("client/app/store/wonder/index", ["client/app/store/wonder/wonder.reducer", "client/app/store/wonder/wonder.transformers"], function(exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    var wonder_reducer_1, wonder_transformers_3;
    return {
        setters:[
            function (wonder_reducer_1_1) {
                wonder_reducer_1 = wonder_reducer_1_1;
            },
            function (wonder_transformers_3_1) {
                wonder_transformers_3 = wonder_transformers_3_1;
            }],
        execute: function() {
            exports_31("wonderReducer", wonder_reducer_1.wonderReducer);
            exports_31("deimmutifyWonder", wonder_transformers_3.deimmutifyWonder);
            exports_31("reimmutifyWonder", wonder_transformers_3.reimmutifyWonder);
        }
    }
});
System.register("client/app/store/index", ['redux', "client/app/store/errorHandler/index", "client/app/store/userForm/index", "client/app/store/user/index", "client/app/store/cloud/index", "client/app/store/wonder/index"], function(exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
    var redux_1, error, userForm, user, cloud, wonder;
    var IAppState, rootReducer, enhancers;
    return {
        setters:[
            function (redux_1_1) {
                redux_1 = redux_1_1;
            },
            function (error_1) {
                error = error_1;
            },
            function (userForm_1) {
                userForm = userForm_1;
            },
            function (user_1) {
                user = user_1;
            },
            function (cloud_1) {
                cloud = cloud_1;
            },
            function (wonder_1) {
                wonder = wonder_1;
            }],
        execute: function() {
            IAppState = (function () {
                function IAppState() {
                }
                return IAppState;
            }());
            exports_32("IAppState", IAppState);
            ;
            exports_32("rootReducer", rootReducer = redux_1.combineReducers({
                error: error.errorHandlerReducer,
                user: user.userReducer,
                userForm: userForm.userFormReducer,
                wonder: wonder.wonderReducer,
                cloudStyle: cloud.cloudReducer,
                animaArray: cloud.animaReducer
            }));
            exports_32("enhancers", enhancers = []);
        }
    }
});
System.register("client/app/actions/cloud/cloud.actions", ['@angular/core', 'ng2-redux'], function(exports_33, context_33) {
    "use strict";
    var __moduleName = context_33 && context_33.id;
    var core_7, ng2_redux_5;
    var CloudActions;
    return {
        setters:[
            function (core_7_1) {
                core_7 = core_7_1;
            },
            function (ng2_redux_5_1) {
                ng2_redux_5 = ng2_redux_5_1;
            }],
        execute: function() {
            CloudActions = (function () {
                function CloudActions(ngRedux) {
                    this.ngRedux = ngRedux;
                }
                CloudActions.prototype.changeAnima = function (anima, index) {
                    this.ngRedux.dispatch({ type: CloudActions.CHANGE_ANIMA, payload: { index: index, timeline: anima } });
                };
                CloudActions.prototype.changeStyle = function (asset, index) {
                    this.ngRedux.dispatch({ type: CloudActions.CHANGE_STYLES, payload: { index: index, asset: asset } });
                };
                CloudActions.CHANGE_STYLES = 'CHANGE_STYLES';
                CloudActions.CHANGE_ANIMA = 'CHANGE_ANIMA';
                CloudActions.decorators = [
                    { type: core_7.Injectable },
                ];
                /** @nocollapse */
                CloudActions.ctorParameters = [
                    { type: ng2_redux_5.NgRedux, },
                ];
                return CloudActions;
            }());
            exports_33("CloudActions", CloudActions);
        }
    }
});
System.register("client/app/actions/cloud/cloud.actions.spec", ['ng2-redux', "client/app/actions/cloud/cloud.actions"], function(exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
    var ng2_redux_6, cloud_actions_2;
    var MockRedux;
    return {
        setters:[
            function (ng2_redux_6_1) {
                ng2_redux_6 = ng2_redux_6_1;
            },
            function (cloud_actions_2_1) {
                cloud_actions_2 = cloud_actions_2_1;
            }],
        execute: function() {
            MockRedux = (function (_super) {
                __extends(MockRedux, _super);
                function MockRedux() {
                    _super.call(this, null);
                }
                return MockRedux;
            }(ng2_redux_6.NgRedux));
            describe('Cloud Actions Creator', function () {
                var actions;
                var mockRedux;
                beforeEach(function () {
                    mockRedux = new MockRedux();
                    actions = new cloud_actions_2.CloudActions(mockRedux);
                });
                it('should dispatch CHANGE_STYLES action', function () {
                    var expectedAction = {
                        type: cloud_actions_2.CloudActions.CHANGE_STYLES,
                        payload: { index: 0, asset: 'testAsset' }
                    };
                    spyOn(mockRedux, 'dispatch');
                    actions.changeStyle('testAsset', 0);
                    expect(mockRedux.dispatch).toHaveBeenCalled();
                    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
                });
                it('should dispatch CHANGE_ANIMA action', function () {
                    var expectedAction = {
                        type: cloud_actions_2.CloudActions.CHANGE_ANIMA,
                        payload: { index: 0, timeline: 'testTimeline' }
                    };
                    spyOn(mockRedux, 'dispatch');
                    actions.changeAnima('testTimeline', 0);
                    expect(mockRedux.dispatch).toHaveBeenCalled();
                    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
                });
            });
        }
    }
});
System.register("client/app/actions/error/errorHandler.actions.spec", ['ng2-redux', "client/app/actions/error/errorHandler.actions"], function(exports_35, context_35) {
    "use strict";
    var __moduleName = context_35 && context_35.id;
    var ng2_redux_7, errorHandler_actions_4;
    var MockRedux;
    return {
        setters:[
            function (ng2_redux_7_1) {
                ng2_redux_7 = ng2_redux_7_1;
            },
            function (errorHandler_actions_4_1) {
                errorHandler_actions_4 = errorHandler_actions_4_1;
            }],
        execute: function() {
            MockRedux = (function (_super) {
                __extends(MockRedux, _super);
                function MockRedux() {
                    _super.call(this, null);
                }
                return MockRedux;
            }(ng2_redux_7.NgRedux));
            describe('ErrorHandler Actions Creator', function () {
                var actions;
                var mockRedux;
                beforeEach(function () {
                    mockRedux = new MockRedux();
                    actions = new errorHandler_actions_4.ErrorHandlerActions(mockRedux);
                });
                it('should dispatch SHOW_ERROR action', function () {
                    var expectedAction = {
                        type: errorHandler_actions_4.ErrorHandlerActions.SHOW_ERROR,
                        payload: 'Testing Error Message'
                    };
                    spyOn(mockRedux, 'dispatch');
                    actions.showError('Testing Error Message');
                    expect(mockRedux.dispatch).toHaveBeenCalled();
                    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
                });
                it('should dispatch HIDE_ERROR action', function () {
                    var expectedAction = {
                        type: errorHandler_actions_4.ErrorHandlerActions.HIDE_ERROR
                    };
                    spyOn(mockRedux, 'dispatch');
                    actions.hideError();
                    expect(mockRedux.dispatch).toHaveBeenCalled();
                    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
                });
            });
        }
    }
});
System.register("client/app/actions/user/user.actions.spec", ['@angular/forms', 'rxjs/Observable', 'ng2-redux', "client/app/actions/user/user.actions", "client/app/services/user/user.service", "client/app/actions/error/errorHandler.actions", 'ng2-cookies/ng2-cookies'], function(exports_36, context_36) {
    "use strict";
    var __moduleName = context_36 && context_36.id;
    var forms_1, Observable_3, ng2_redux_8, user_actions_2, user_service_2, errorHandler_actions_5, ng2_cookies_3;
    var testUser, MockRedux, MockUserService;
    return {
        setters:[
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (Observable_3_1) {
                Observable_3 = Observable_3_1;
            },
            function (ng2_redux_8_1) {
                ng2_redux_8 = ng2_redux_8_1;
            },
            function (user_actions_2_1) {
                user_actions_2 = user_actions_2_1;
            },
            function (user_service_2_1) {
                user_service_2 = user_service_2_1;
            },
            function (errorHandler_actions_5_1) {
                errorHandler_actions_5 = errorHandler_actions_5_1;
            },
            function (ng2_cookies_3_1) {
                ng2_cookies_3 = ng2_cookies_3_1;
            }],
        execute: function() {
            testUser = {
                _id: '1234',
                created: 'today',
                userName: 'testUserName',
                firstName: 'testFirstName',
                lastName: 'testLastName',
                email: 'testEmail',
                role: 'testRole'
            };
            MockRedux = (function (_super) {
                __extends(MockRedux, _super);
                function MockRedux() {
                    _super.call(this, null);
                }
                return MockRedux;
            }(ng2_redux_8.NgRedux));
            MockUserService = (function (_super) {
                __extends(MockUserService, _super);
                function MockUserService() {
                    _super.call(this, null);
                }
                MockUserService.prototype.getMe = function () {
                    return Observable_3.Observable.of(testUser);
                };
                MockUserService.prototype.login = function (email, password) {
                    return Observable_3.Observable.of(testUser);
                };
                MockUserService.prototype.signup = function (username, email, password) {
                    return Observable_3.Observable.of(testUser);
                };
                MockUserService.prototype.logout = function () { };
                return MockUserService;
            }(user_service_2.UserService));
            describe('User Actions Creator', function () {
                var actions;
                var userService;
                var errorActions;
                var mockRedux;
                beforeEach(function () {
                    ng2_cookies_3.Cookie.delete('token');
                    userService = new MockUserService();
                    mockRedux = new MockRedux();
                    errorActions = new errorHandler_actions_5.ErrorHandlerActions(mockRedux);
                    actions = new user_actions_2.UserActions(mockRedux, errorActions, userService);
                });
                it('should dispatch LOGIN_USER action when getMe() called', function () {
                    ng2_cookies_3.Cookie.set('token', 'testCookie');
                    var expectedAction = {
                        type: user_actions_2.UserActions.LOGIN_USER,
                        payload: testUser
                    };
                    spyOn(mockRedux, 'dispatch');
                    actions.getMe();
                    expect(mockRedux.dispatch).toHaveBeenCalled();
                    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
                });
                it('should dispatch LOGIN_USER action', function () {
                    var expectedAction = {
                        type: user_actions_2.UserActions.LOGIN_USER,
                        payload: testUser
                    };
                    var form = new forms_1.FormGroup({
                        login_email: new forms_1.FormControl("test"),
                        login_password: new forms_1.FormControl("test")
                    });
                    spyOn(mockRedux, 'dispatch');
                    actions.login(form);
                    expect(mockRedux.dispatch).toHaveBeenCalled();
                    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
                });
                it('should dispatch REGISTER_USER action', function () {
                    var expectedAction = {
                        type: user_actions_2.UserActions.REGISTER_USER,
                        payload: testUser
                    };
                    var form = new forms_1.FormGroup({
                        signup_username: new forms_1.FormControl("testUserName"),
                        signup_email: new forms_1.FormControl("testEmail"),
                        signup_password: new forms_1.FormControl("test"),
                        signup_re_password: new forms_1.FormControl("test")
                    });
                    spyOn(mockRedux, 'dispatch');
                    actions.register(form);
                    expect(mockRedux.dispatch).toHaveBeenCalled();
                    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
                });
                it('should dispatch LOGOUT_USER action', function () {
                    var expectedAction = { type: user_actions_2.UserActions.LOGOUT_USER };
                    spyOn(mockRedux, 'dispatch');
                    actions.logout();
                    expect(mockRedux.dispatch).toHaveBeenCalled();
                    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
                });
            });
        }
    }
});
System.register("client/app/actions/userForm/userForm.actions.spec", ['ng2-redux', "client/app/actions/userForm/userForm.actions"], function(exports_37, context_37) {
    "use strict";
    var __moduleName = context_37 && context_37.id;
    var ng2_redux_9, userForm_actions_2;
    var MockRedux;
    return {
        setters:[
            function (ng2_redux_9_1) {
                ng2_redux_9 = ng2_redux_9_1;
            },
            function (userForm_actions_2_1) {
                userForm_actions_2 = userForm_actions_2_1;
            }],
        execute: function() {
            MockRedux = (function (_super) {
                __extends(MockRedux, _super);
                function MockRedux() {
                    _super.call(this, null);
                }
                return MockRedux;
            }(ng2_redux_9.NgRedux));
            describe('UserForm Actions Creator', function () {
                var actions;
                var mockRedux;
                beforeEach(function () {
                    mockRedux = new MockRedux();
                    actions = new userForm_actions_2.UserFormActions(mockRedux);
                });
                it('should dispatch LOGIN_FORM_IN action', function () {
                    var expectedAction = {
                        type: userForm_actions_2.UserFormActions.LOGIN_FORM_IN
                    };
                    spyOn(mockRedux, 'dispatch');
                    actions.loginForm(true);
                    expect(mockRedux.dispatch).toHaveBeenCalled();
                    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
                });
                it('should dispatch LOGIN_FORM_OUT action', function () {
                    var expectedAction = {
                        type: userForm_actions_2.UserFormActions.LOGIN_FORM_OUT
                    };
                    spyOn(mockRedux, 'dispatch');
                    actions.loginForm(false);
                    expect(mockRedux.dispatch).toHaveBeenCalled();
                    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
                });
                it('should dispatch REGISTER_FORM_IN action', function () {
                    var expectedAction = {
                        type: userForm_actions_2.UserFormActions.REGISTER_FORM_IN
                    };
                    spyOn(mockRedux, 'dispatch');
                    actions.registerForm(true);
                    expect(mockRedux.dispatch).toHaveBeenCalled();
                    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
                });
                it('should dispatch REGISTER_FORM_OUT action', function () {
                    var expectedAction = {
                        type: userForm_actions_2.UserFormActions.REGISTER_FORM_OUT
                    };
                    spyOn(mockRedux, 'dispatch');
                    actions.registerForm(false);
                    expect(mockRedux.dispatch).toHaveBeenCalled();
                    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
                });
            });
        }
    }
});
System.register("client/app/services/socketio/socketio.service", ['@angular/core', 'rxjs/Observable', 'ng2-redux', 'lodash', 'socket.io-client'], function(exports_38, context_38) {
    "use strict";
    var __moduleName = context_38 && context_38.id;
    var core_8, Observable_4, ng2_redux_10, _, io;
    var SocketService;
    return {
        setters:[
            function (core_8_1) {
                core_8 = core_8_1;
            },
            function (Observable_4_1) {
                Observable_4 = Observable_4_1;
            },
            function (ng2_redux_10_1) {
                ng2_redux_10 = ng2_redux_10_1;
            },
            function (_2) {
                _ = _2;
            },
            function (io_1) {
                io = io_1;
            }],
        execute: function() {
            SocketService = (function () {
                function SocketService(ngRedux) {
                    this.ngRedux = ngRedux;
                    // socket.io now auto-configures its connection when we ommit a connection url
                    this.socket = io.connect({ path: '/socket.io' });
                }
                /**
                 * Register listeners to sync an array with updates on a model
                 *
                 * Takes the array we want to sync, the model name that socket updates are sent from,
                 * and an optional callback function after new items are updated.
                 *
                 * modelName: The server model with atached socket listener
                 * array: model array from service subscription
                 * stateArray: Redux states that this syncUpdates instance will invoke
                 *    index 0: update/add-state, index 1: remove-state
                 * cb: callback function, will be invoked after redux dispatch
                 * bcb: beforeCallback function, will be invoked before redux dispatch
                 * dpDelay: dispatch delay, give dp time until dispatch is called
                 *    NOTE: bcb will be called immidiately, dispatch will wait dp to execute
                 */
                SocketService.prototype.syncUpdates = function (modelName, array, stateArray, cb, bcb, dpDelay) {
                    var _this = this;
                    /**
                     * Syncs item creation/updates on 'model:save'
                     */
                    this.socket.on(modelName + ':save', function (item) {
                        var oldItem = _.find(array, { _id: item._id });
                        var index = array.indexOf(oldItem);
                        var event = 'created';
                        var isNew;
                        // replace oldItem if it exists
                        // otherwise just add item to the collection
                        if (oldItem) {
                            // Update store with new object
                            isNew = false;
                            event = 'updated';
                        }
                        else {
                            // Finds the model for the listener
                            // and pushes a new object to store
                            isNew = true;
                        }
                        // create beforCall observable and set the delay to specified time
                        var bcbObs = Observable_4.Observable.of(true).map(function () { return bcb ? bcb(item, index, event) : null; }).delay(dpDelay ? dpDelay : 0);
                        //create the normal socketio execution observable
                        var nowObs = Observable_4.Observable.of(true).map(function () {
                            _this.ngRedux.dispatch({ type: stateArray[0], payload: { index: index, object: item, isNew: isNew } });
                        });
                        // create callback observable
                        var cbObs = Observable_4.Observable.of(true).map(function () { return cb ? cb(item, index, event) : null; });
                        // concatonate all observables in proper order and subscribe to execute
                        return Observable_4.Observable.concat(bcbObs, nowObs, cbObs).subscribe();
                    });
                    /**
                     * Syncs removed items on 'model:remove'
                     */
                    this.socket.on(modelName + ':remove', function (item) {
                        var event = 'deconsted';
                        var oldItem = _.find(array, { _id: item._id });
                        var index = array.indexOf(oldItem);
                        _.remove(array, { _id: item._id });
                        var nowObserv = Observable_4.Observable.of(true).map(function () {
                            _this.ngRedux.dispatch({ type: stateArray[1], payload: { index: index, object: item } });
                        });
                        var cbObserv = Observable_4.Observable.of(true).map(function () { return cb ? cb(item, index, event) : null; });
                        return Observable_4.Observable.concat(nowObserv, cbObserv).subscribe();
                    });
                };
                /**
                 * Removes listeners for a models updates on the socket
                 */
                SocketService.prototype.unsyncUpdates = function (modelName) {
                    this.socket.removeListener(modelName + ':save');
                    this.socket.removeListener(modelName + ':remove');
                };
                SocketService.decorators = [
                    { type: core_8.Injectable },
                ];
                /** @nocollapse */
                SocketService.ctorParameters = [
                    { type: ng2_redux_10.NgRedux, },
                ];
                return SocketService;
            }());
            exports_38("SocketService", SocketService);
        }
    }
});
System.register("client/app/actions/wonder/wonder.actions.spec", ['rxjs/Observable', 'ng2-redux', "client/app/actions/error/errorHandler.actions", "client/app/actions/wonder/wonder.actions", "client/app/services/wonder/wonder.service"], function(exports_39, context_39) {
    "use strict";
    var __moduleName = context_39 && context_39.id;
    var Observable_5, ng2_redux_11, errorHandler_actions_6, wonder_actions_2, wonder_service_2;
    var wonderList, MockRedux, MockWonderService;
    return {
        setters:[
            function (Observable_5_1) {
                Observable_5 = Observable_5_1;
            },
            function (ng2_redux_11_1) {
                ng2_redux_11 = ng2_redux_11_1;
            },
            function (errorHandler_actions_6_1) {
                errorHandler_actions_6 = errorHandler_actions_6_1;
            },
            function (wonder_actions_2_1) {
                wonder_actions_2 = wonder_actions_2_1;
            },
            function (wonder_service_2_1) {
                wonder_service_2 = wonder_service_2_1;
            }],
        execute: function() {
            wonderList = [{
                    _id: '1',
                    created: '1',
                    name: 'SocketIO',
                    xcoor: 20,
                    ycoor: 25
                }, {
                    _id: '2',
                    created: '2',
                    name: 'MongoDB',
                    xcoor: 20,
                    ycoor: 35
                }, {
                    _id: '3',
                    created: '3',
                    name: 'Angular 2',
                    xcoor: 25,
                    ycoor: 45
                }, {
                    _id: '4',
                    created: '4',
                    name: 'Karma',
                    xcoor: 40,
                    ycoor: 18
                }, {
                    _id: '5',
                    created: '5',
                    name: 'Express',
                    xcoor: 60,
                    ycoor: 65
                }, {
                    _id: '6',
                    created: '6',
                    name: 'Jasmine',
                    xcoor: 80,
                    ycoor: 55
                }, {
                    _id: '7',
                    created: '7',
                    name: 'OAuth',
                    xcoor: 15,
                    ycoor: 35
                }, {
                    _id: '8',
                    created: '8',
                    name: 'Node',
                    xcoor: 13,
                    ycoor: 40
                }, {
                    _id: '9',
                    created: '9',
                    name: 'Redux',
                    xcoor: 15,
                    ycoor: 35
                }, {
                    _id: '10',
                    created: '10',
                    name: 'Protractor',
                    xcoor: 50,
                    ycoor: 15
                }];
            MockRedux = (function (_super) {
                __extends(MockRedux, _super);
                function MockRedux() {
                    _super.call(this, null);
                }
                return MockRedux;
            }(ng2_redux_11.NgRedux));
            MockWonderService = (function (_super) {
                __extends(MockWonderService, _super);
                function MockWonderService() {
                    _super.call(this, null);
                }
                MockWonderService.prototype.getWonders = function () {
                    return Observable_5.Observable.of(wonderList);
                };
                MockWonderService.prototype.saveWonders = function (name) {
                    return Observable_5.Observable.of({
                        _id: '10',
                        created: '10',
                        name: 'TEST',
                        xcoor: 50,
                        ycoor: 15
                    });
                };
                return MockWonderService;
            }(wonder_service_2.WonderService));
            describe('Wonder Actions Creator', function () {
                var actions;
                var wonderService;
                var socket;
                var errorActions;
                var mockRedux;
                beforeEach(function () {
                    wonderService = new MockWonderService();
                    mockRedux = new MockRedux();
                    errorActions = new errorHandler_actions_6.ErrorHandlerActions(mockRedux);
                    actions = new wonder_actions_2.WonderActions(mockRedux, errorActions, wonderService);
                });
                it('should dispatch INITIALIZE_WONDERS action', function () {
                    var expectedAction = {
                        type: wonder_actions_2.WonderActions.INITIALIZE_WONDERS,
                        payload: wonderList
                    };
                    spyOn(mockRedux, 'dispatch');
                    actions.initWonders(wonderList);
                    expect(mockRedux.dispatch).toHaveBeenCalled();
                    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
                });
                it('should dispatch CHANGE_WONDERS action', function () {
                    var wonder = {
                        _id: '9',
                        created: '9',
                        name: 'NEW WONDER',
                        xcoor: 15,
                        ycoor: 35
                    };
                    var expectedAction = {
                        type: wonder_actions_2.WonderActions.CHANGE_WONDERS,
                        payload: { index: 7, object: wonder }
                    };
                    spyOn(mockRedux, 'dispatch');
                    actions.changeWonder(wonder, 7);
                    expect(mockRedux.dispatch).toHaveBeenCalled();
                    expect(mockRedux.dispatch).toHaveBeenCalledWith(expectedAction);
                });
            });
        }
    }
});
/*
=========================================================================================================
Bootstrapping component
=========================================================================================================
//According to Angular best practices the App component should be used for bootstrapping the application.
//This component gets bootstrapped through app.module.ts, the magic occurs in the @NgModule decorater's bootstrap property,
//we set that value to the AppComponent class defined in this component
//then the app.module.ts gets invoked in the main.ts bootstrap method.
*/
System.register("client/app/components/app/app.component", ['@angular/core', 'ng2-redux', "client/app/actions/error/errorHandler.actions", 'rxjs/Observable'], function(exports_40, context_40) {
    "use strict";
    var __moduleName = context_40 && context_40.id;
    var core_9, ng2_redux_12, errorHandler_actions_7, Observable_6;
    var AppComponent;
    return {
        setters:[
            function (core_9_1) {
                core_9 = core_9_1;
            },
            function (ng2_redux_12_1) {
                ng2_redux_12 = ng2_redux_12_1;
            },
            function (errorHandler_actions_7_1) {
                errorHandler_actions_7 = errorHandler_actions_7_1;
            },
            function (Observable_6_1) {
                Observable_6 = Observable_6_1;
            }],
        execute: function() {
            //decorator
            //class which is implemented once the AfterViewInit event in tha Angular event lifecycle has fired.
            //-- to learn more about Angular's event lifecycle read here: https://angular.io/docs/ts/latest/guide/lifecycle-hooks.html
            AppComponent = (function () {
                function AppComponent(errorHandler) {
                    this.errorHandler = errorHandler;
                }
                AppComponent.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    // initialize error handling animation timeline
                    this.timeline = new TimelineMax({ paused: true });
                    this.timeline.to(this.errorToast.nativeElement.children[0], 1, { opacity: 1 })
                        .to(this.errorToast.nativeElement.children[0], 1, { opacity: 0 }, "+=3")
                        .add(function () { return _this.errorHandler.hideError(); });
                    // Let the component be in charge of triggering the animation
                    this.error$.subscribe(function (error) { return error.get('message') ? _this.timeline.play(0) : null; });
                };
                AppComponent.decorators = [
                    { type: core_9.Component, args: [{
                                selector: 'my-app',
                                templateUrl: './app.component.html',
                                styleUrls: ['./app.component.scss']
                            },] },
                ];
                /** @nocollapse */
                AppComponent.ctorParameters = [
                    { type: errorHandler_actions_7.ErrorHandlerActions, },
                ];
                AppComponent.propDecorators = {
                    'errorToast': [{ type: core_9.ViewChild, args: ['errorToast',] },],
                };
                __decorate([
                    ng2_redux_12.select('error'), 
                    __metadata('design:type', Observable_6.Observable)
                ], AppComponent.prototype, "error$", void 0);
                return AppComponent;
            }());
            exports_40("AppComponent", AppComponent);
        }
    }
});
System.register("client/app/components/user-profile/user-profile.component", ['@angular/core'], function(exports_41, context_41) {
    "use strict";
    var __moduleName = context_41 && context_41.id;
    var core_10;
    var UserProfileComponent;
    return {
        setters:[
            function (core_10_1) {
                core_10 = core_10_1;
            }],
        execute: function() {
            UserProfileComponent = (function () {
                function UserProfileComponent() {
                    this.firstName = "Chris";
                    this.lastName = "Haugen";
                    this.userName = this.firstName + " " + this.lastName;
                    this.bgImg = "#";
                    this.userImg = "#";
                }
                UserProfileComponent.decorators = [
                    { type: core_10.Component, args: [{
                                // moduleId: module.id,
                                selector: 'user-profile',
                                templateUrl: './user-profile.component.html',
                                styleUrls: ['./user-profile.component.scss']
                            },] },
                ];
                /** @nocollapse */
                UserProfileComponent.ctorParameters = [];
                return UserProfileComponent;
            }());
            exports_41("UserProfileComponent", UserProfileComponent);
        }
    }
});
System.register("client/app/components/404/four0four.component", ['@angular/core'], function(exports_42, context_42) {
    "use strict";
    var __moduleName = context_42 && context_42.id;
    var core_11;
    var Four0FourComponent;
    return {
        setters:[
            function (core_11_1) {
                core_11 = core_11_1;
            }],
        execute: function() {
            Four0FourComponent = (function () {
                function Four0FourComponent() {
                }
                Four0FourComponent.decorators = [
                    { type: core_11.Component, args: [{
                                selector: 'four0four-section',
                                template: "<img src=\"assets/pedobear.jpg\">"
                            },] },
                ];
                /** @nocollapse */
                Four0FourComponent.ctorParameters = [];
                return Four0FourComponent;
            }());
            exports_42("Four0FourComponent", Four0FourComponent);
        }
    }
});
System.register("client/app/components/home/home.component", ['@angular/core'], function(exports_43, context_43) {
    "use strict";
    var __moduleName = context_43 && context_43.id;
    var core_12;
    var HomeComponent;
    return {
        setters:[
            function (core_12_1) {
                core_12 = core_12_1;
            }],
        execute: function() {
            HomeComponent = (function () {
                function HomeComponent() {
                    this.sunXPos = 24;
                    this.sunYPos = 1;
                }
                HomeComponent.decorators = [
                    { type: core_12.Component, args: [{
                                selector: 'home-section',
                                templateUrl: './home.component.html',
                                styleUrls: ['./home.component.scss']
                            },] },
                ];
                /** @nocollapse */
                HomeComponent.ctorParameters = [];
                return HomeComponent;
            }());
            exports_43("HomeComponent", HomeComponent);
        }
    }
});
System.register("client/app/routes", ['@angular/router', "client/app/components/user-profile/user-profile.component", "client/app/components/404/four0four.component", "client/app/components/home/home.component"], function(exports_44, context_44) {
    "use strict";
    var __moduleName = context_44 && context_44.id;
    var router_1, user_profile_component_1, four0four_component_1, home_component_1;
    var appRoutes, routing;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (user_profile_component_1_1) {
                user_profile_component_1 = user_profile_component_1_1;
            },
            function (four0four_component_1_1) {
                four0four_component_1 = four0four_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            }],
        execute: function() {
            //this is the json object which stores all the data the router uses to determine which component to show in the view based on which href the client uses to query the app
            exports_44("appRoutes", appRoutes = [
                {
                    //path: the relative href queried by the client
                    path: '',
                    //component: the component which will be loaded into the view when the above path is queried by the client
                    component: home_component_1.HomeComponent,
                    //data: any metadata we wish to use when this view is loaded, can be used for SEO enhancement
                    data: {
                        title: 'Home'
                    }
                },
                {
                    path: 'profile',
                    component: user_profile_component_1.UserProfileComponent
                },
                {
                    path: '**',
                    component: four0four_component_1.Four0FourComponent
                }
            ]);
            //routing is exported so we can usee it in app.module.ts where we will add a configured Router module to our root NgModule imports
            exports_44("routing", routing = router_1.RouterModule.forRoot(appRoutes));
        }
    }
});
System.register("client/app/components/header/header.component", ['@angular/core'], function(exports_45, context_45) {
    "use strict";
    var __moduleName = context_45 && context_45.id;
    var core_13;
    var HeaderComponent;
    return {
        setters:[
            function (core_13_1) {
                core_13 = core_13_1;
            }],
        execute: function() {
            HeaderComponent = (function () {
                function HeaderComponent() {
                }
                HeaderComponent.decorators = [
                    { type: core_13.Component, args: [{
                                selector: 'header-section',
                                templateUrl: './header.component.html',
                                styleUrls: ['./header.component.scss']
                            },] },
                ];
                /** @nocollapse */
                HeaderComponent.ctorParameters = [];
                return HeaderComponent;
            }());
            exports_45("HeaderComponent", HeaderComponent);
        }
    }
});
System.register("client/app/components/navbar/navbar.component", ['@angular/core'], function(exports_46, context_46) {
    "use strict";
    var __moduleName = context_46 && context_46.id;
    var core_14;
    var NavbarComponent;
    return {
        setters:[
            function (core_14_1) {
                core_14 = core_14_1;
            }],
        execute: function() {
            NavbarComponent = (function () {
                function NavbarComponent() {
                }
                NavbarComponent.decorators = [
                    { type: core_14.Component, args: [{
                                selector: 'main-navbar',
                                templateUrl: './navbar.component.html',
                                styleUrls: ['./navbar.component.scss']
                            },] },
                ];
                /** @nocollapse */
                NavbarComponent.ctorParameters = [];
                return NavbarComponent;
            }());
            exports_46("NavbarComponent", NavbarComponent);
        }
    }
});
System.register("client/app/components/signinout/signinout.component", ['@angular/core', 'rxjs/Observable', 'ng2-redux', "client/app/actions/user/user.actions", "client/app/actions/userForm/userForm.actions", "client/app/actions/error/errorHandler.actions"], function(exports_47, context_47) {
    "use strict";
    var __moduleName = context_47 && context_47.id;
    var core_15, Observable_7, ng2_redux_13, user_actions_3, userForm_actions_3, errorHandler_actions_8;
    var SignInOutComponent;
    return {
        setters:[
            function (core_15_1) {
                core_15 = core_15_1;
            },
            function (Observable_7_1) {
                Observable_7 = Observable_7_1;
            },
            function (ng2_redux_13_1) {
                ng2_redux_13 = ng2_redux_13_1;
            },
            function (user_actions_3_1) {
                user_actions_3 = user_actions_3_1;
            },
            function (userForm_actions_3_1) {
                userForm_actions_3 = userForm_actions_3_1;
            },
            function (errorHandler_actions_8_1) {
                errorHandler_actions_8 = errorHandler_actions_8_1;
            }],
        execute: function() {
            SignInOutComponent = (function () {
                function SignInOutComponent(userActions, userFormActions, errorHandler) {
                    this.userActions = userActions;
                    this.userFormActions = userFormActions;
                    this.errorHandler = errorHandler;
                }
                SignInOutComponent.prototype.ngOnInit = function () {
                    this.userActions.getMe();
                };
                SignInOutComponent.decorators = [
                    { type: core_15.Component, args: [{
                                selector: 'signinout',
                                providers: [user_actions_3.UserActions, userForm_actions_3.UserFormActions],
                                templateUrl: './signinout.component.html',
                                styleUrls: ['./signinout.component.scss']
                            },] },
                ];
                /** @nocollapse */
                SignInOutComponent.ctorParameters = [
                    { type: user_actions_3.UserActions, },
                    { type: userForm_actions_3.UserFormActions, },
                    { type: errorHandler_actions_8.ErrorHandlerActions, },
                ];
                __decorate([
                    ng2_redux_13.select('user'), 
                    __metadata('design:type', Observable_7.Observable)
                ], SignInOutComponent.prototype, "user$", void 0);
                __decorate([
                    ng2_redux_13.select('userForm'), 
                    __metadata('design:type', Observable_7.Observable)
                ], SignInOutComponent.prototype, "userForm$", void 0);
                return SignInOutComponent;
            }());
            exports_47("SignInOutComponent", SignInOutComponent);
        }
    }
});
System.register("client/app/components/footer/footer.component", ['@angular/core'], function(exports_48, context_48) {
    "use strict";
    var __moduleName = context_48 && context_48.id;
    var core_16;
    var FooterComponent;
    return {
        setters:[
            function (core_16_1) {
                core_16 = core_16_1;
            }],
        execute: function() {
            FooterComponent = (function () {
                function FooterComponent() {
                }
                FooterComponent.decorators = [
                    { type: core_16.Component, args: [{
                                selector: 'footer-section',
                                templateUrl: './footer.component.html',
                                styleUrls: ['./footer.component.scss']
                            },] },
                ];
                /** @nocollapse */
                FooterComponent.ctorParameters = [];
                return FooterComponent;
            }());
            exports_48("FooterComponent", FooterComponent);
        }
    }
});
System.register("client/app/services/clock/clock.service", ['@angular/core', 'rxjs/Observable', 'rxjs/add/observable/interval', 'rxjs/add/operator/map'], function(exports_49, context_49) {
    "use strict";
    var __moduleName = context_49 && context_49.id;
    var core_17, Observable_8;
    var ClockService;
    return {
        setters:[
            function (core_17_1) {
                core_17 = core_17_1;
            },
            function (Observable_8_1) {
                Observable_8 = Observable_8_1;
            },
            function (_3) {},
            function (_4) {}],
        execute: function() {
            ClockService = (function () {
                function ClockService() {
                    var _this = this;
                    this.sunRise = false;
                    this.dayTime = false;
                    this.sunSet = false;
                    this.nightTime = false;
                    //creates an observable which returns the date object every second
                    this.currentTime = Observable_8.Observable.interval(1000).map(function () { return new Date(); });
                    //sets the time of day in real time
                    this.setTOD = this.currentTime.subscribe(function (time) {
                        if (time.getHours() === 5 || time.getHours() === 6) {
                            _this.sunRise = true;
                            _this.dayTime = false;
                            _this.sunSet = false;
                            _this.nightTime = false;
                        }
                        else if (time.getHours() >= 7 && time.getHours() <= 17) {
                            _this.sunRise = false;
                            _this.dayTime = true;
                            _this.sunSet = false;
                            _this.nightTime = false;
                        }
                        else if (time.getHours() === 18 || time.getHours() === 19) {
                            _this.sunRise = false;
                            _this.dayTime = false;
                            _this.sunSet = true;
                            _this.nightTime = false;
                        }
                        else {
                            _this.sunRise = false;
                            _this.dayTime = false;
                            _this.sunSet = false;
                            _this.nightTime = true;
                        }
                    });
                }
                ClockService.decorators = [
                    { type: core_17.Injectable },
                ];
                /** @nocollapse */
                ClockService.ctorParameters = [];
                return ClockService;
            }());
            exports_49("ClockService", ClockService);
        }
    }
});
System.register("client/app/components/sky/sky.component", ['@angular/core', "@angular/platform-browser", "client/app/services/clock/clock.service"], function(exports_50, context_50) {
    "use strict";
    var __moduleName = context_50 && context_50.id;
    var core_18, platform_browser_1, clock_service_1;
    var SkyComponent;
    return {
        setters:[
            function (core_18_1) {
                core_18 = core_18_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (clock_service_1_1) {
                clock_service_1 = clock_service_1_1;
            }],
        execute: function() {
            SkyComponent = (function () {
                function SkyComponent(clockService, sanitizer, hostRef) {
                    this.clockService = clockService;
                    this.sanitizer = sanitizer;
                    this.hostRef = hostRef;
                    //syns the clock variable to the current time provided by the service
                    this.clock = this.clockService.currentTime;
                }
                SkyComponent.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    //logic to set the position of the sun and moon
                    this.sunMoonPos();
                    this.clockSubscription = this.clock.subscribe(function (time) {
                        //sets the css based on the time of day
                        _this.timeOfDayCss();
                        _this.sunMoonAngle = (Math.floor((((time.getHours() + 6) % 12) * 60 + time.getMinutes()) * 0.25)) + 180;
                        _this.plotSunOnArc(_this.sunMoonAngle, _this.radius, _this.centerX, _this.centerY);
                        _this.safeTransform = _this.sanitizer.bypassSecurityTrustStyle("translate( " + _this.sunMoonX + "px, " + _this.sunMoonY + "px )");
                    });
                };
                SkyComponent.prototype.onResize = function (event) {
                    //logic to set the position of the sun and moon
                    this.sunMoonPos();
                    this.plotSunOnArc(this.sunMoonAngle, this.radius, this.centerX, this.centerY);
                    this.safeTransform = this.sanitizer.bypassSecurityTrustStyle("translate( " + this.sunMoonX + "px, " + this.sunMoonY + "px )");
                };
                SkyComponent.prototype.plotSunOnArc = function (angle, radius, centerX, centerY) {
                    this.sunMoonX = radius * Math.cos(this.toRadians(angle));
                    this.sunMoonY = radius * Math.sin(this.toRadians(angle));
                };
                SkyComponent.prototype.toRadians = function (angle) {
                    return angle * (Math.PI / 180);
                };
                SkyComponent.prototype.sunMoonPos = function () {
                    this.centerX = this.hostRef.nativeElement.offsetWidth / 2 - (this.sunMoon.nativeElement.offsetWidth / 2);
                    this.centerY = this.hostRef.nativeElement.offsetHeight;
                    if (this.hostRef.nativeElement.offsetHeight < this.hostRef.nativeElement.offsetWidth) {
                        if (this.hostRef.nativeElement.offsetHeight < this.hostRef.nativeElement.offsetWidth / 2) {
                            this.radius = this.hostRef.nativeElement.offsetHeight;
                        }
                        else {
                            this.radius = this.hostRef.nativeElement.offsetWidth / 2 - this.sunMoon.nativeElement.offsetWidth;
                        }
                    }
                    else {
                        this.radius = this.hostRef.nativeElement.offsetWidth / 2 - this.sunMoon.nativeElement.offsetWidth;
                    }
                };
                SkyComponent.prototype.timeOfDayCss = function () {
                    if (this.clockService.sunRise) {
                        this.sunMoonGlow = "0px 0px 100px 12px orange";
                        this.safeRGBA = this.sanitizer.bypassSecurityTrustStyle("rgba(255,129,0, 0.3)");
                        this.hostRef.nativeElement.style.backgroundColor = "#2f556d";
                    }
                    else if (this.clockService.dayTime) {
                        this.sunMoonGlow = "0px 0px 100px 12px yellow";
                        this.safeRGBA = this.sanitizer.bypassSecurityTrustStyle("rgba(255,255,0, 0.3)");
                        this.hostRef.nativeElement.style.backgroundColor = "#5394be";
                    }
                    else if (this.clockService.sunSet) {
                        this.sunMoonGlow = "0px 0px 100px 12px orange";
                        this.safeRGBA = this.sanitizer.bypassSecurityTrustStyle("rgba(255,129,0, 0.3)");
                        this.hostRef.nativeElement.style.backgroundColor = "#2f556d";
                    }
                    else if (this.clockService.nightTime) {
                        this.sunMoonGlow = "0px 0px 100px 12px purple";
                        this.safeRGBA = this.sanitizer.bypassSecurityTrustStyle("rgba(102,51,153, 0.3)");
                        this.hostRef.nativeElement.style.backgroundColor = "#0a001b";
                    }
                    else {
                        console.log('time of day not valid check sky.component.ts');
                    }
                };
                SkyComponent.decorators = [
                    { type: core_18.Component, args: [{
                                selector: 'the-sky',
                                providers: [clock_service_1.ClockService],
                                templateUrl: './sky.component.html',
                                styleUrls: ['./sky.component.scss']
                            },] },
                ];
                /** @nocollapse */
                SkyComponent.ctorParameters = [
                    { type: clock_service_1.ClockService, },
                    { type: platform_browser_1.DomSanitizer, },
                    { type: core_18.ElementRef, },
                ];
                SkyComponent.propDecorators = {
                    'sunMoon': [{ type: core_18.ViewChild, args: ['sunMoon',] },],
                    'onResize': [{ type: core_18.HostListener, args: ['window:resize', ['$event'],] },],
                };
                return SkyComponent;
            }());
            exports_50("SkyComponent", SkyComponent);
        }
    }
});
System.register("client/app/components/mountain-range/mountain-range.component", ['@angular/core'], function(exports_51, context_51) {
    "use strict";
    var __moduleName = context_51 && context_51.id;
    var core_19;
    var MountainRangeComponent;
    return {
        setters:[
            function (core_19_1) {
                core_19 = core_19_1;
            }],
        execute: function() {
            MountainRangeComponent = (function () {
                function MountainRangeComponent() {
                }
                MountainRangeComponent.decorators = [
                    { type: core_19.Component, args: [{
                                selector: 'mountain-range',
                                templateUrl: './mountain-range.component.html',
                                styleUrls: ['./mountain-range.component.scss']
                            },] },
                ];
                /** @nocollapse */
                MountainRangeComponent.ctorParameters = [];
                return MountainRangeComponent;
            }());
            exports_51("MountainRangeComponent", MountainRangeComponent);
        }
    }
});
System.register("client/app/components/GOAT/GOAT.component", ['@angular/core'], function(exports_52, context_52) {
    "use strict";
    var __moduleName = context_52 && context_52.id;
    var core_20;
    var GOATComponent;
    return {
        setters:[
            function (core_20_1) {
                core_20 = core_20_1;
            }],
        execute: function() {
            GOATComponent = (function () {
                function GOATComponent() {
                }
                GOATComponent.decorators = [
                    { type: core_20.Component, args: [{
                                selector: 'the-goat',
                                templateUrl: './GOAT.component.html',
                                styleUrls: ['./GOAT.component.scss']
                            },] },
                ];
                /** @nocollapse */
                GOATComponent.ctorParameters = [];
                return GOATComponent;
            }());
            exports_52("GOATComponent", GOATComponent);
        }
    }
});
System.register("client/app/components/cloud-generator/cloud-generator.component", ['@angular/core', 'rxjs/Observable', 'ng2-redux', "client/app/actions/wonder/wonder.actions", "client/app/services/wonder/wonder.service", "client/app/services/clock/clock.service", "client/app/services/socketio/socketio.service", "client/app/actions/cloud/cloud.actions"], function(exports_53, context_53) {
    "use strict";
    var __moduleName = context_53 && context_53.id;
    var core_21, Observable_9, ng2_redux_14, wonder_actions_3, wonder_service_3, clock_service_2, socketio_service_1, cloud_actions_3;
    var CloudGeneratorComponent;
    return {
        setters:[
            function (core_21_1) {
                core_21 = core_21_1;
            },
            function (Observable_9_1) {
                Observable_9 = Observable_9_1;
            },
            function (ng2_redux_14_1) {
                ng2_redux_14 = ng2_redux_14_1;
            },
            function (wonder_actions_3_1) {
                wonder_actions_3 = wonder_actions_3_1;
            },
            function (wonder_service_3_1) {
                wonder_service_3 = wonder_service_3_1;
            },
            function (clock_service_2_1) {
                clock_service_2 = clock_service_2_1;
            },
            function (socketio_service_1_1) {
                socketio_service_1 = socketio_service_1_1;
            },
            function (cloud_actions_3_1) {
                cloud_actions_3 = cloud_actions_3_1;
            }],
        execute: function() {
            CloudGeneratorComponent = (function () {
                function CloudGeneratorComponent(wonderActions, wonderService, cloudActions, socket, clockService) {
                    this.wonderActions = wonderActions;
                    this.wonderService = wonderService;
                    this.cloudActions = cloudActions;
                    this.socket = socket;
                    this.clockService = clockService;
                }
                CloudGeneratorComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.width = window.innerWidth;
                    this.clockService.currentTime.subscribe(function (time) { return _this.timeOfDayCss(); });
                    this.animaArray$.subscribe(function (anima) { return _this.animaArray = anima; });
                    this.wonderService.getWonders()
                        .subscribe(function (wonders) {
                        // initialize store wonders
                        _this.wonderActions.initWonders(wonders);
                        // initialize store cloudStyle
                        wonders.forEach(function (item, index) { return _this.cloudType(item.name.length, index); });
                        // initialize socketio listener with backCall and delay till callback
                        // For more information look inside the socketio.service
                        _this.socket.syncUpdates('Wonder', wonders, ['CHANGE_WONDERS'], null, function (item, index) {
                            TweenMax.to(_this.wonderSky.nativeElement.children[index], 1, {
                                opacity: 0,
                                callbackScope: _this,
                                onComplete: _this.cloudType,
                                onCompleteParams: [item.name.length, index, true]
                            });
                        }, 1000);
                    });
                };
                CloudGeneratorComponent.prototype.ngOnDestroy = function () {
                    // detach socket listening when component is destroyed
                    this.socket.unsyncUpdates('Wonder');
                };
                CloudGeneratorComponent.prototype.loopAnima = function (index) {
                    this.animaArray.get(index).restart();
                };
                CloudGeneratorComponent.prototype.cloudAnima = function (value, el, object, index) {
                    if (this.animaArray.size === 10)
                        this.animaArray.get(index).kill();
                    var anima = new TimelineMax({
                        callbackScope: this,
                        onComplete: this.loopAnima,
                        onCompleteParams: [index]
                    });
                    // TODO: find a way to get the initial element position to subtract from innerWidth
                    anima.to(el, 0, { ease: Power0.easeNone, left: '-350px', x: '0', y: '0' })
                        .to(el, this.rndInt(30, 85), { ease: Power0.easeNone, x: this.width + 350, y: this.rndInt(-200, 200) });
                    // Push new gsap timeline to animaArray List
                    this.cloudActions.changeAnima(anima, index);
                    return value;
                };
                CloudGeneratorComponent.prototype.cloudType = function (wonderLength, index) {
                    var randomInt = this.rndInt(1, 3);
                    if (wonderLength <= 4) {
                        switch (randomInt) {
                            case 1:
                                this.cloudActions.changeStyle('smallcloud1', index);
                                break;
                            case 2:
                                this.cloudActions.changeStyle('smallcloud2', index);
                                break;
                            case 3:
                                this.cloudActions.changeStyle('smallcloud3', index);
                                break;
                        }
                    }
                    else if (wonderLength > 4 && wonderLength <= 15) {
                        switch (randomInt) {
                            case 1:
                                this.cloudActions.changeStyle('mediumcloud1', index);
                                break;
                            case 2:
                                this.cloudActions.changeStyle('mediumcloud2', index);
                                break;
                            case 3:
                                this.cloudActions.changeStyle('mediumcloud3', index);
                                break;
                        }
                    }
                    else {
                        switch (randomInt) {
                            case 1:
                                this.cloudActions.changeStyle('largecloud1', index);
                                break;
                            case 2:
                                this.cloudActions.changeStyle('largecloud2', index);
                                break;
                            case 3:
                                this.cloudActions.changeStyle('largecloud3', index);
                                break;
                        }
                    }
                };
                CloudGeneratorComponent.prototype.rndInt = function (min, max) {
                    return Math.floor(Math.random() * (max - min + 1) + min);
                };
                CloudGeneratorComponent.prototype.timeOfDayCss = function () {
                    if (this.clockService.sunRise) {
                        this.wonderSky.nativeElement.style.filter = "brightness(70%)";
                    }
                    else if (this.clockService.dayTime) {
                        this.wonderSky.nativeElement.style.filter = "brightness(100%)";
                    }
                    else if (this.clockService.sunSet) {
                        this.wonderSky.nativeElement.style.filter = "brightness(70%)";
                    }
                    else if (this.clockService.nightTime) {
                        this.wonderSky.nativeElement.style.filter = "brightness(30%)";
                    }
                    else {
                        console.log('time of day not valid check sky.component.ts');
                    }
                };
                CloudGeneratorComponent.decorators = [
                    { type: core_21.Component, args: [{
                                selector: 'cloud-generator',
                                providers: [wonder_actions_3.WonderActions, cloud_actions_3.CloudActions],
                                templateUrl: './cloud-generator.component.html',
                                styleUrls: ['./cloud-generator.component.scss']
                            },] },
                ];
                /** @nocollapse */
                CloudGeneratorComponent.ctorParameters = [
                    { type: wonder_actions_3.WonderActions, },
                    { type: wonder_service_3.WonderService, },
                    { type: cloud_actions_3.CloudActions, },
                    { type: socketio_service_1.SocketService, },
                    { type: clock_service_2.ClockService, },
                ];
                CloudGeneratorComponent.propDecorators = {
                    'wonderSky': [{ type: core_21.ViewChild, args: ['wonderSky',] },],
                };
                __decorate([
                    ng2_redux_14.select('cloudStyle'), 
                    __metadata('design:type', Observable_9.Observable)
                ], CloudGeneratorComponent.prototype, "cloudStyle$", void 0);
                __decorate([
                    ng2_redux_14.select('animaArray'), 
                    __metadata('design:type', Observable_9.Observable)
                ], CloudGeneratorComponent.prototype, "animaArray$", void 0);
                __decorate([
                    ng2_redux_14.select('wonder'), 
                    __metadata('design:type', Observable_9.Observable)
                ], CloudGeneratorComponent.prototype, "wonder$", void 0);
                return CloudGeneratorComponent;
            }());
            exports_53("CloudGeneratorComponent", CloudGeneratorComponent);
        }
    }
});
System.register("client/app/services/auth/auth.service", ['@angular/core', '@angular/http', 'ng2-cookies/ng2-cookies'], function(exports_54, context_54) {
    "use strict";
    var __moduleName = context_54 && context_54.id;
    var core_22, http_3, ng2_cookies_4;
    var HttpIntercept;
    return {
        setters:[
            function (core_22_1) {
                core_22 = core_22_1;
            },
            function (http_3_1) {
                http_3 = http_3_1;
            },
            function (ng2_cookies_4_1) {
                ng2_cookies_4 = ng2_cookies_4_1;
            }],
        execute: function() {
            HttpIntercept = (function (_super) {
                __extends(HttpIntercept, _super);
                function HttpIntercept(backend, defaultOptions) {
                    _super.call(this, backend, defaultOptions);
                }
                HttpIntercept.prototype.request = function (url, options) {
                    return _super.prototype.request.call(this, url, this.getRequestOptionArgs(false, options));
                };
                HttpIntercept.prototype.get = function (url, options) {
                    return _super.prototype.get.call(this, url, this.getRequestOptionArgs(false, options));
                };
                HttpIntercept.prototype.post = function (url, body, options) {
                    return _super.prototype.post.call(this, url, body, this.getRequestOptionArgs(true, options));
                };
                HttpIntercept.prototype.put = function (url, body, options) {
                    return _super.prototype.put.call(this, url, body, this.getRequestOptionArgs(true, options));
                };
                HttpIntercept.prototype.delete = function (url, options) {
                    return _super.prototype.delete.call(this, url, this.getRequestOptionArgs(false, options));
                };
                HttpIntercept.prototype.getRequestOptionArgs = function (sendJSON, options) {
                    var token = ng2_cookies_4.Cookie.get('token');
                    if (options == null) {
                        options = new http_3.RequestOptions();
                    }
                    if (options.headers == null) {
                        options.headers = new http_3.Headers();
                    }
                    if (sendJSON)
                        options.headers.append('Content-Type', 'application/json');
                    if (token)
                        options.headers.append('Authorization', 'Bearer ' + token);
                    return options;
                };
                // intercept(observable: Observable<Response>): Observable<Response> {
                //     return observable.catch((err, source) => {
                //         if (err.status == 401 && !_.endsWith(err.url, 'api/auth/login')) {
                //             this._router.navigate(['/login']);
                //             return Observable.empty();
                //         } else {
                //             return Observable.throw(err);
                //         }
                //     });    //
                // }
                HttpIntercept.decorators = [
                    { type: core_22.Injectable },
                ];
                /** @nocollapse */
                HttpIntercept.ctorParameters = [
                    { type: http_3.ConnectionBackend, },
                    { type: http_3.RequestOptions, },
                ];
                return HttpIntercept;
            }(http_3.Http));
            exports_54("HttpIntercept", HttpIntercept);
        }
    }
});
System.register("client/app/pipes/ngFor-hook.pipe", ['@angular/core'], function(exports_55, context_55) {
    "use strict";
    var __moduleName = context_55 && context_55.id;
    var core_23;
    var NgForHookPipe;
    return {
        setters:[
            function (core_23_1) {
                core_23 = core_23_1;
            }],
        execute: function() {
            NgForHookPipe = (function () {
                function NgForHookPipe() {
                }
                NgForHookPipe.prototype.transform = function (value, el, object, index, scope) {
                    // Function pointer causes referencing misalignment
                    // Using class scope instead
                    return scope.cloudAnima(value, el, object, index);
                };
                NgForHookPipe.decorators = [
                    { type: core_23.Pipe, args: [{ name: 'ngForHook' },] },
                ];
                /** @nocollapse */
                NgForHookPipe.ctorParameters = [];
                return NgForHookPipe;
            }());
            exports_55("NgForHookPipe", NgForHookPipe);
        }
    }
});
/*
==============================================================
* Root Module
==============================================================
// Any assets included in this file will be attached
// to the global scope of the application.
*/
System.register("client/app/app.module", ["client/app/components/app/app.component", '@angular/core', '@angular/forms', '@angular/platform-browser', '@angular/http', '@angular/material', 'ng2-redux', "client/app/routes", "client/app/components/header/header.component", "client/app/components/navbar/navbar.component", "client/app/components/signinout/signinout.component", "client/app/components/home/home.component", "client/app/components/footer/footer.component", "client/app/components/404/four0four.component", "client/app/components/user-profile/user-profile.component", "client/app/components/sky/sky.component", "client/app/components/mountain-range/mountain-range.component", "client/app/components/GOAT/GOAT.component", "client/app/components/cloud-generator/cloud-generator.component", "client/app/actions/error/errorHandler.actions", "client/app/services/socketio/socketio.service", "client/app/services/auth/auth.service", "client/app/services/user/user.service", "client/app/services/wonder/wonder.service", 'ng2-cookies/ng2-cookies', "client/app/pipes/ngFor-hook.pipe", 'gsap', "client/app/store/index", 'redux-logger'], function(exports_56, context_56) {
    "use strict";
    var __moduleName = context_56 && context_56.id;
    var app_component_1, core_24, forms_2, platform_browser_2, http_4, material_1, ng2_redux_15, routes_1, http_5, header_component_1, navbar_component_1, signinout_component_1, home_component_2, footer_component_1, four0four_component_2, user_profile_component_2, sky_component_1, mountain_range_component_1, GOAT_component_1, cloud_generator_component_1, errorHandler_actions_9, socketio_service_2, auth_service_1, user_service_3, wonder_service_4, ng2_cookies_5, ngFor_hook_pipe_1, store_1, redux_logger_1;
    var AppModule;
    /*
    --------------------------------------------------
    exported functions for AoT
    --------------------------------------------------
    */
    function httpFactory(backend, defaultOptions) {
        return new auth_service_1.HttpIntercept(backend, defaultOptions);
    }
    exports_56("httpFactory", httpFactory);
    return {
        setters:[
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (core_24_1) {
                core_24 = core_24_1;
            },
            function (forms_2_1) {
                forms_2 = forms_2_1;
            },
            function (platform_browser_2_1) {
                platform_browser_2 = platform_browser_2_1;
            },
            function (http_4_1) {
                http_4 = http_4_1;
                http_5 = http_4_1;
            },
            function (material_1_1) {
                material_1 = material_1_1;
            },
            function (ng2_redux_15_1) {
                ng2_redux_15 = ng2_redux_15_1;
            },
            function (routes_1_1) {
                routes_1 = routes_1_1;
            },
            function (header_component_1_1) {
                header_component_1 = header_component_1_1;
            },
            function (navbar_component_1_1) {
                navbar_component_1 = navbar_component_1_1;
            },
            function (signinout_component_1_1) {
                signinout_component_1 = signinout_component_1_1;
            },
            function (home_component_2_1) {
                home_component_2 = home_component_2_1;
            },
            function (footer_component_1_1) {
                footer_component_1 = footer_component_1_1;
            },
            function (four0four_component_2_1) {
                four0four_component_2 = four0four_component_2_1;
            },
            function (user_profile_component_2_1) {
                user_profile_component_2 = user_profile_component_2_1;
            },
            function (sky_component_1_1) {
                sky_component_1 = sky_component_1_1;
            },
            function (mountain_range_component_1_1) {
                mountain_range_component_1 = mountain_range_component_1_1;
            },
            function (GOAT_component_1_1) {
                GOAT_component_1 = GOAT_component_1_1;
            },
            function (cloud_generator_component_1_1) {
                cloud_generator_component_1 = cloud_generator_component_1_1;
            },
            function (errorHandler_actions_9_1) {
                errorHandler_actions_9 = errorHandler_actions_9_1;
            },
            function (socketio_service_2_1) {
                socketio_service_2 = socketio_service_2_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (user_service_3_1) {
                user_service_3 = user_service_3_1;
            },
            function (wonder_service_4_1) {
                wonder_service_4 = wonder_service_4_1;
            },
            function (ng2_cookies_5_1) {
                ng2_cookies_5 = ng2_cookies_5_1;
            },
            function (ngFor_hook_pipe_1_1) {
                ngFor_hook_pipe_1 = ngFor_hook_pipe_1_1;
            },
            function (_5) {},
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (redux_logger_1_1) {
                redux_logger_1 = redux_logger_1_1;
            }],
        execute: function() {
            /*
            --------------------------------------------------
            NgModule
            --------------------------------------------------
            //decorator which packages all resources imported above for the app
            //without this decorator Angular cannot use any of those above assets
            */
            //by convention the root module is called AppModule as stated in the Angular2 docs
            //we call AppModule in main.ts to bootstrap the application which points to the AppComponent defined in @NgModule
            AppModule = (function () {
                function AppModule(ngRedux, devTool) {
                    this.ngRedux = ngRedux;
                    this.devTool = devTool;
                    this.ngRedux.configureStore(store_1.rootReducer, {}, [redux_logger_1.default({ collapsed: true })], store_1.enhancers.concat([devTool.isEnabled() ? devTool.enhancer() : function (f) { return f; }]));
                }
                AppModule.decorators = [
                    { type: core_24.NgModule, args: [{
                                //imports: this object imports helper modules which are children in the module tree
                                imports: [
                                    ng2_redux_15.NgReduxModule.forRoot(),
                                    material_1.MaterialModule.forRoot(),
                                    platform_browser_2.BrowserModule,
                                    http_4.HttpModule,
                                    forms_2.FormsModule,
                                    http_4.JsonpModule,
                                    routes_1.routing
                                ],
                                //declarations: this object imports all child components which are used in this module
                                declarations: [
                                    four0four_component_2.Four0FourComponent,
                                    user_profile_component_2.UserProfileComponent,
                                    footer_component_1.FooterComponent,
                                    signinout_component_1.SignInOutComponent,
                                    header_component_1.HeaderComponent,
                                    home_component_2.HomeComponent,
                                    app_component_1.AppComponent,
                                    navbar_component_1.NavbarComponent,
                                    sky_component_1.SkyComponent,
                                    mountain_range_component_1.MountainRangeComponent,
                                    GOAT_component_1.GOATComponent,
                                    cloud_generator_component_1.CloudGeneratorComponent,
                                    ngFor_hook_pipe_1.NgForHookPipe
                                ],
                                //providers: this object imports all necessary services into the module
                                providers: [
                                    {
                                        provide: http_5.Http,
                                        useFactory: httpFactory,
                                        deps: [http_5.XHRBackend, http_5.RequestOptions]
                                    },
                                    errorHandler_actions_9.ErrorHandlerActions,
                                    socketio_service_2.SocketService,
                                    ng2_cookies_5.Cookie,
                                    { provide: ng2_redux_15.DevToolsExtension, useClass: ng2_redux_15.DevToolsExtension },
                                    user_service_3.UserService,
                                    wonder_service_4.WonderService
                                ],
                                //bootstrap: identifies which component is supposed to be bootstrapped
                                bootstrap: [app_component_1.AppComponent]
                            },] },
                ];
                /** @nocollapse */
                AppModule.ctorParameters = [
                    { type: ng2_redux_15.NgRedux, },
                    { type: ng2_redux_15.DevToolsExtension, },
                ];
                return AppModule;
            }());
            exports_56("AppModule", AppModule);
        }
    }
});
System.register("client/app/main", ['@angular/platform-browser-dynamic', "client/app/app.module"], function(exports_57, context_57) {
    "use strict";
    var __moduleName = context_57 && context_57.id;
    var platform_browser_dynamic_1, app_module_1;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (app_module_1_1) {
                app_module_1 = app_module_1_1;
            }],
        execute: function() {
            // Compile and launch the module
            platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
        }
    }
});
System.register("client/app/store/cloud/cloud.reducer.spec", ['immutable', "client/app/store/cloud/cloud.reducer", "client/app/store/cloud/cloud.initial-state", "client/app/actions/cloud/cloud.actions"], function(exports_58, context_58) {
    "use strict";
    var __moduleName = context_58 && context_58.id;
    var immutable_7, cloud_reducer_2, cloud_initial_state_2, cloud_actions_4;
    return {
        setters:[
            function (immutable_7_1) {
                immutable_7 = immutable_7_1;
            },
            function (cloud_reducer_2_1) {
                cloud_reducer_2 = cloud_reducer_2_1;
            },
            function (cloud_initial_state_2_1) {
                cloud_initial_state_2 = cloud_initial_state_2_1;
            },
            function (cloud_actions_4_1) {
                cloud_actions_4 = cloud_actions_4_1;
            }],
        execute: function() {
            describe('Cloud Reducer', function () {
                var cloudInitialState = cloud_initial_state_2.STYLE_INITIAL_STATE;
                var animaInitialState = cloud_initial_state_2.ANIMA_INITIAL_STATE;
                beforeEach(function () {
                    cloudInitialState = cloud_reducer_2.cloudReducer(undefined, { type: 'TEST_INIT' });
                    animaInitialState = cloud_reducer_2.animaReducer(undefined, { type: 'TEST_INIT' });
                });
                it('should have an immutable initial state', function () {
                    expect(immutable_7.List.isList(cloudInitialState)).toBe(true);
                    expect(immutable_7.List.isList(animaInitialState)).toBe(true);
                });
                it('should change states to a List of 10', function () {
                    var previousStateStyle = cloudInitialState;
                    var previousStateAnima = animaInitialState;
                    var nextStateStyle = previousStateStyle;
                    var nextStateAnima = previousStateAnima;
                    for (var i = 0; i < 10; i++) {
                        nextStateStyle = cloud_reducer_2.cloudReducer(nextStateStyle, { type: cloud_actions_4.CloudActions.CHANGE_STYLES, payload: { asset: 'test' + i } });
                        nextStateAnima = cloud_reducer_2.animaReducer(nextStateAnima, { type: cloud_actions_4.CloudActions.CHANGE_ANIMA, payload: { timeline: 'test' + i } });
                    }
                    expect(previousStateStyle.size).toBe(0);
                    expect(previousStateAnima.size).toBe(0);
                    expect(nextStateStyle.size).toBe(10);
                    expect(nextStateAnima.size).toBe(10);
                });
                it('should change List item at appropriate index', function () {
                    var previousStateStyle = cloudInitialState;
                    var previousStateAnima = animaInitialState;
                    var nextStateStyle = previousStateStyle;
                    var nextStateAnima = previousStateAnima;
                    for (var i = 0; i < 10; i++) {
                        nextStateStyle = cloud_reducer_2.cloudReducer(nextStateStyle, { type: cloud_actions_4.CloudActions.CHANGE_STYLES, payload: { asset: 'test' + i } });
                        nextStateAnima = cloud_reducer_2.animaReducer(nextStateAnima, { type: cloud_actions_4.CloudActions.CHANGE_ANIMA, payload: { timeline: 'test' + i } });
                    }
                    var finalStateStyle = cloud_reducer_2.cloudReducer(nextStateStyle, { type: cloud_actions_4.CloudActions.CHANGE_STYLES, payload: { index: 3, asset: 'TEST_ASSET_STYLE' } });
                    var finalStateAnima = cloud_reducer_2.animaReducer(nextStateAnima, { type: cloud_actions_4.CloudActions.CHANGE_ANIMA, payload: { index: 5, timeline: 'TEST_ASSET_ANIMA' } });
                    expect(nextStateStyle.get(3)).toBe('test3');
                    expect(nextStateAnima.get(5)).toBe('test5');
                    expect(finalStateStyle.get(3)).toBe('TEST_ASSET_STYLE');
                    expect(finalStateAnima.get(5)).toBe('TEST_ASSET_ANIMA');
                });
            });
        }
    }
});
System.register("client/app/store/errorHandler/errorHandler.reducer.spec", ['immutable', "client/app/store/errorHandler/errorHandler.reducer", "client/app/store/errorHandler/errorHandler.initial-state", "client/app/actions/error/errorHandler.actions"], function(exports_59, context_59) {
    "use strict";
    var __moduleName = context_59 && context_59.id;
    var immutable_8, errorHandler_reducer_2, errorHandler_initial_state_2, errorHandler_actions_10;
    return {
        setters:[
            function (immutable_8_1) {
                immutable_8 = immutable_8_1;
            },
            function (errorHandler_reducer_2_1) {
                errorHandler_reducer_2 = errorHandler_reducer_2_1;
            },
            function (errorHandler_initial_state_2_1) {
                errorHandler_initial_state_2 = errorHandler_initial_state_2_1;
            },
            function (errorHandler_actions_10_1) {
                errorHandler_actions_10 = errorHandler_actions_10_1;
            }],
        execute: function() {
            describe('ErrorHandler Reducer', function () {
                var initialState = errorHandler_initial_state_2.INITIAL_STATE;
                beforeEach(function () {
                    initialState = errorHandler_reducer_2.errorHandlerReducer(undefined, { type: 'TEST_INIT' });
                });
                it('should have an immutable initial state', function () {
                    expect(immutable_8.Map.isMap(initialState)).toBe(true);
                });
                it('should set the error message on SHOW_ERROR', function () {
                    var previousState = initialState;
                    var nextState = errorHandler_reducer_2.errorHandlerReducer(initialState, { type: errorHandler_actions_10.ErrorHandlerActions.SHOW_ERROR, payload: 'Testing Error Message' });
                    expect(previousState.getIn(['message'])).toBe('');
                    expect(nextState.getIn(['message'])).toBe('Testing Error Message');
                });
                it('should remove error message on HIDE_ERROR', function () {
                    // First SHOW_ERROR and check
                    var nextState = errorHandler_reducer_2.errorHandlerReducer(initialState, { type: errorHandler_actions_10.ErrorHandlerActions.SHOW_ERROR, payload: 'Testing Error Message' });
                    expect(nextState.getIn(['message'])).toBe('Testing Error Message');
                    // Then HIDE_ERROR and check
                    var nextState2 = errorHandler_reducer_2.errorHandlerReducer(nextState, { type: errorHandler_actions_10.ErrorHandlerActions.HIDE_ERROR });
                    expect(nextState2.getIn(['message'])).toBe('');
                });
            });
        }
    }
});
System.register("client/app/store/user/user.reducer.spec", ['immutable', "client/app/store/user/user.reducer", "client/app/store/user/user.initial-state", "client/app/actions/user/user.actions"], function(exports_60, context_60) {
    "use strict";
    var __moduleName = context_60 && context_60.id;
    var immutable_9, user_reducer_2, user_initial_state_2, user_actions_4;
    var testUser;
    return {
        setters:[
            function (immutable_9_1) {
                immutable_9 = immutable_9_1;
            },
            function (user_reducer_2_1) {
                user_reducer_2 = user_reducer_2_1;
            },
            function (user_initial_state_2_1) {
                user_initial_state_2 = user_initial_state_2_1;
            },
            function (user_actions_4_1) {
                user_actions_4 = user_actions_4_1;
            }],
        execute: function() {
            testUser = {
                _id: '1234',
                created: 'today',
                userName: 'testUserName',
                firstName: 'testFirstName',
                lastName: 'testLastName',
                email: 'testEmail',
                role: 'testRole'
            };
            describe('User Reducer', function () {
                var initialState = user_initial_state_2.INITIAL_STATE;
                beforeEach(function () {
                    initialState = user_reducer_2.userReducer(undefined, { type: 'TEST_INIT' });
                });
                it('should have an immutable initial state', function () {
                    expect(immutable_9.Map.isMap(initialState)).toBe(true);
                });
                it('should set user to user Object on LOGIN_USER', function () {
                    var previousState = initialState;
                    var nextState = user_reducer_2.userReducer(previousState, { type: user_actions_4.UserActions.LOGIN_USER, payload: testUser });
                    expect(previousState.isEmpty()).toBe(true);
                    expect(nextState.getIn(['_id'])).toBe('1234');
                    expect(nextState.getIn(['created'])).toBe('today');
                    expect(nextState.getIn(['userName'])).toBe('testUserName');
                    expect(nextState.getIn(['firstName'])).toBe('testFirstName');
                    expect(nextState.getIn(['lastName'])).toBe('testLastName');
                    expect(nextState.getIn(['email'])).toBe('testEmail');
                    expect(nextState.getIn(['role'])).toBe('testRole');
                });
                it('should set user to user Object on REGISTER_USER', function () {
                    var previousState = initialState;
                    var nextState = user_reducer_2.userReducer(previousState, { type: user_actions_4.UserActions.REGISTER_USER, payload: testUser });
                    expect(previousState.isEmpty()).toBe(true);
                    expect(nextState.getIn(['_id'])).toBe('1234');
                    expect(nextState.getIn(['created'])).toBe('today');
                    expect(nextState.getIn(['userName'])).toBe('testUserName');
                    expect(nextState.getIn(['firstName'])).toBe('testFirstName');
                    expect(nextState.getIn(['lastName'])).toBe('testLastName');
                    expect(nextState.getIn(['email'])).toBe('testEmail');
                    expect(nextState.getIn(['role'])).toBe('testRole');
                });
                it('should set user to empty Map on LOGOUT_USER', function () {
                    var previousState = user_reducer_2.userReducer(initialState, { type: user_actions_4.UserActions.LOGIN_USER, payload: testUser });
                    var nextState = user_reducer_2.userReducer(previousState, { type: user_actions_4.UserActions.LOGOUT_USER });
                    expect(previousState.getIn(['_id'])).toBe('1234');
                    expect(previousState.getIn(['created'])).toBe('today');
                    expect(previousState.getIn(['userName'])).toBe('testUserName');
                    expect(previousState.getIn(['firstName'])).toBe('testFirstName');
                    expect(previousState.getIn(['lastName'])).toBe('testLastName');
                    expect(previousState.getIn(['email'])).toBe('testEmail');
                    expect(previousState.getIn(['role'])).toBe('testRole');
                    expect(nextState.isEmpty()).toBe(true);
                });
            });
        }
    }
});
System.register("client/app/store/userForm/userForm.reducer.spec", ['immutable', "client/app/store/userForm/userForm.reducer", "client/app/store/userForm/userForm.initial-state", "client/app/actions/userForm/userForm.actions"], function(exports_61, context_61) {
    "use strict";
    var __moduleName = context_61 && context_61.id;
    var immutable_10, userForm_reducer_2, userForm_initial_state_2, userForm_actions_4;
    return {
        setters:[
            function (immutable_10_1) {
                immutable_10 = immutable_10_1;
            },
            function (userForm_reducer_2_1) {
                userForm_reducer_2 = userForm_reducer_2_1;
            },
            function (userForm_initial_state_2_1) {
                userForm_initial_state_2 = userForm_initial_state_2_1;
            },
            function (userForm_actions_4_1) {
                userForm_actions_4 = userForm_actions_4_1;
            }],
        execute: function() {
            describe('UserForm Reducer', function () {
                var initialState = userForm_initial_state_2.INITIAL_STATE;
                beforeEach(function () {
                    initialState = userForm_reducer_2.userFormReducer(undefined, { type: 'TEST_INIT' });
                });
                it('should have an immutable initial state', function () {
                    expect(immutable_10.Map.isMap(initialState)).toBe(true);
                });
                it('should set userSigning to true on LOGIN_FORM_IN', function () {
                    var previousState = initialState;
                    var nextState = userForm_reducer_2.userFormReducer(previousState, { type: userForm_actions_4.UserFormActions.LOGIN_FORM_IN });
                    expect(previousState.getIn(['userSigning'])).toBe(false);
                    expect(previousState.getIn(['userSignup'])).toBe(false);
                    expect(nextState.getIn(['userSigning'])).toBe(true);
                    expect(nextState.getIn(['userSignup'])).toBe(false);
                });
                it('should set userSigning to false on LOGIN_FORM_OUT', function () {
                    var previousState = userForm_reducer_2.userFormReducer(initialState, { type: userForm_actions_4.UserFormActions.LOGIN_FORM_IN });
                    var nextState = userForm_reducer_2.userFormReducer(previousState, { type: userForm_actions_4.UserFormActions.LOGIN_FORM_OUT });
                    expect(previousState.getIn(['userSigning'])).toBe(true);
                    expect(previousState.getIn(['userSignup'])).toBe(false);
                    expect(nextState.getIn(['userSigning'])).toBe(false);
                    expect(nextState.getIn(['userSignup'])).toBe(false);
                });
                it('should set userSignup to true on REGISTER_FORM_IN', function () {
                    var previousState = initialState;
                    var nextState = userForm_reducer_2.userFormReducer(previousState, { type: userForm_actions_4.UserFormActions.REGISTER_FORM_IN });
                    expect(previousState.getIn(['userSigning'])).toBe(false);
                    expect(previousState.getIn(['userSignup'])).toBe(false);
                    expect(nextState.getIn(['userSigning'])).toBe(false);
                    expect(nextState.getIn(['userSignup'])).toBe(true);
                });
                it('should set userSignup to false on REGISTER_FORM_OUT', function () {
                    var previousState = userForm_reducer_2.userFormReducer(initialState, { type: userForm_actions_4.UserFormActions.REGISTER_FORM_IN });
                    var nextState = userForm_reducer_2.userFormReducer(previousState, { type: userForm_actions_4.UserFormActions.REGISTER_FORM_OUT });
                    expect(previousState.getIn(['userSigning'])).toBe(false);
                    expect(previousState.getIn(['userSignup'])).toBe(true);
                    expect(nextState.getIn(['userSigning'])).toBe(false);
                    expect(nextState.getIn(['userSignup'])).toBe(false);
                });
                it('should set swap userSigning and userSignup on REGISTER_FORM_IN', function () {
                    var previousState = userForm_reducer_2.userFormReducer(initialState, { type: userForm_actions_4.UserFormActions.LOGIN_FORM_IN });
                    var nextState = userForm_reducer_2.userFormReducer(previousState, { type: userForm_actions_4.UserFormActions.REGISTER_FORM_IN });
                    expect(previousState.getIn(['userSigning'])).toBe(true);
                    expect(previousState.getIn(['userSignup'])).toBe(false);
                    expect(nextState.getIn(['userSigning'])).toBe(false);
                    expect(nextState.getIn(['userSignup'])).toBe(true);
                });
                it('should set swap userSignup and userSigning on LOGIN_FORM_IN', function () {
                    var previousState = userForm_reducer_2.userFormReducer(initialState, { type: userForm_actions_4.UserFormActions.REGISTER_FORM_IN });
                    var nextState = userForm_reducer_2.userFormReducer(previousState, { type: userForm_actions_4.UserFormActions.LOGIN_FORM_IN });
                    expect(previousState.getIn(['userSigning'])).toBe(false);
                    expect(previousState.getIn(['userSignup'])).toBe(true);
                    expect(nextState.getIn(['userSigning'])).toBe(true);
                    expect(nextState.getIn(['userSignup'])).toBe(false);
                });
            });
        }
    }
});
System.register("client/app/store/wonder/wonder.reducer.spec", ['immutable', "client/app/store/wonder/wonder.reducer", "client/app/store/wonder/wonder.initial-state", "client/app/actions/wonder/wonder.actions"], function(exports_62, context_62) {
    "use strict";
    var __moduleName = context_62 && context_62.id;
    var immutable_11, wonder_reducer_2, wonder_initial_state_2, wonder_actions_4;
    var wonderList;
    return {
        setters:[
            function (immutable_11_1) {
                immutable_11 = immutable_11_1;
            },
            function (wonder_reducer_2_1) {
                wonder_reducer_2 = wonder_reducer_2_1;
            },
            function (wonder_initial_state_2_1) {
                wonder_initial_state_2 = wonder_initial_state_2_1;
            },
            function (wonder_actions_4_1) {
                wonder_actions_4 = wonder_actions_4_1;
            }],
        execute: function() {
            wonderList = [{
                    _id: '1',
                    created: '1',
                    name: 'SocketIO',
                    xcoor: 20,
                    ycoor: 25
                }, {
                    _id: '2',
                    created: '2',
                    name: 'MongoDB',
                    xcoor: 20,
                    ycoor: 35
                }, {
                    _id: '3',
                    created: '3',
                    name: 'Angular 2',
                    xcoor: 25,
                    ycoor: 45
                }, {
                    _id: '4',
                    created: '4',
                    name: 'Karma',
                    xcoor: 40,
                    ycoor: 18
                }, {
                    _id: '5',
                    created: '5',
                    name: 'Express',
                    xcoor: 60,
                    ycoor: 65
                }, {
                    _id: '6',
                    created: '6',
                    name: 'Jasmine',
                    xcoor: 80,
                    ycoor: 55
                }, {
                    _id: '7',
                    created: '7',
                    name: 'OAuth',
                    xcoor: 15,
                    ycoor: 35
                }, {
                    _id: '8',
                    created: '8',
                    name: 'Node',
                    xcoor: 13,
                    ycoor: 40
                }, {
                    _id: '9',
                    created: '9',
                    name: 'Redux',
                    xcoor: 15,
                    ycoor: 35
                }, {
                    _id: '10',
                    created: '10',
                    name: 'Protractor',
                    xcoor: 50,
                    ycoor: 15
                }];
            describe('Wonder Reducer', function () {
                var initialState = wonder_initial_state_2.INITIAL_STATE;
                beforeEach(function () {
                    initialState = wonder_reducer_2.wonderReducer(undefined, { type: 'TEST_INIT' });
                });
                it('should have an immutable initial state', function () {
                    expect(immutable_11.List.isList(initialState)).toBe(true);
                });
                it('should change states to a List of 10', function () {
                    var previousState = initialState;
                    var nextState = wonder_reducer_2.wonderReducer(previousState, { type: wonder_actions_4.WonderActions.INITIALIZE_WONDERS, payload: wonderList });
                    expect(previousState.size).toBe(0);
                    expect(previousState.size).toBe(0);
                    expect(nextState.size).toBe(10);
                    expect(nextState.size).toBe(10);
                });
                it('should change wonder state List at appropriate index', function () {
                    var wonder = {
                        _id: '99',
                        created: '99',
                        name: 'TEST WONDER',
                        xcoor: 99,
                        ycoor: 99
                    };
                    var previousState = wonder_reducer_2.wonderReducer(initialState, { type: wonder_actions_4.WonderActions.INITIALIZE_WONDERS, payload: wonderList });
                    var nextState = wonder_reducer_2.wonderReducer(previousState, { type: wonder_actions_4.WonderActions.CHANGE_WONDERS, payload: { index: 4, object: wonder } });
                    expect(previousState.getIn([4, 'name'])).toBe('Express');
                    expect(nextState.getIn([4, 'name'])).toBe('TEST WONDER');
                });
            });
        }
    }
});
/*
===============================================================================
These assets get called no matter what Node's process.env.NODE_ENV is set to.
===============================================================================
*/
System.register("config/assets/default", [], function(exports_63, context_63) {
    "use strict";
    var __moduleName = context_63 && context_63.id;
    var defaultAssets;
    return {
        setters:[],
        execute: function() {
            exports_63("defaultAssets", defaultAssets = {
                client: {
                    dist: {
                        js: [
                            'dist/app/app.js'
                        ],
                        css: [
                            'dist/styles.css',
                        ],
                        assets: [
                            'dist/app/assets/*jpg',
                            'dist/app/assets/*.png',
                            'dist/app/assets/*.svg'
                        ],
                        views: [
                            'dist/app/index.html',
                        ]
                    },
                    scss: [
                        'client/styles.scss'
                    ],
                    css: [
                        'client/app/**/**/*.css'
                    ],
                    ts: [
                        'client/app/*.ts',
                        'client/app/**/**/*.ts'
                    ],
                    assets: [
                        'client/assets/*jpg',
                        'client/assets/*.png',
                        'client/assets/*.svg'
                    ],
                    views: [
                        'client/index.html',
                    ],
                    spec: [
                        'client/app/**/**/*.spec.ts'
                    ],
                    e2e: [
                        'client/e2e/**/*.e2e-spec.js'
                    ],
                    system: ['config/sys/systemjs.config.js']
                },
                server: {
                    allTS: [
                        'server/*.ts',
                        'server/api/**/*.controller.ts',
                        'server/api/**/*.events.ts',
                        'server/api/**/*.model.ts',
                        'server/api/**/*.router.ts',
                        'server/auth/*.ts',
                        'server/auth/**/*.ts'
                    ],
                    allJS: [
                        'dist/server.js'
                    ],
                    tests: {
                        integration: 'dist/server/api/**/*.integration.js',
                        unit: 'dist/server/api/**/*.spec.js'
                    },
                    system: [
                        'config/sys/index.js',
                        'config/sys/systemjs.server.js'
                    ]
                },
                config: {
                    allTS: [
                        'config/assets/*.ts',
                        'config/env/*.ts',
                        'config/lib/*.ts',
                    ]
                }
            });
        }
    }
});
/*
===============================================
Used when process.env.NODE_ENV = 'development'
===============================================
//This file adds assets and overwrites assets in the ./default.ts file
//process.env.NODE_ENV is utilized in config/config.ts
*/
System.register("config/assets/development", [], function(exports_64, context_64) {
    "use strict";
    var __moduleName = context_64 && context_64.id;
    var devAssets;
    return {
        setters:[],
        execute: function() {
            exports_64("devAssets", devAssets = {});
        }
    }
});
/*
===============================================
Used when process.env.NODE_ENV = 'production'
===============================================
//This file adds assets and overwrites assets in the ./default.ts file
//process.env.NODE_ENV is utilized in config/config.ts
*/
System.register("config/assets/production", [], function(exports_65, context_65) {
    "use strict";
    var __moduleName = context_65 && context_65.id;
    var prodAssets;
    return {
        setters:[],
        execute: function() {
            exports_65("prodAssets", prodAssets = {});
        }
    }
});
/*
======================================================================================
Used when process.env.NODE_ENV is equal to 'test'
======================================================================================
//This file adds assets and overwrites assets in the ./default.ts file
//process.env.NODE_ENV is utilized in config/config.ts
*/
System.register("config/assets/test", [], function(exports_66, context_66) {
    "use strict";
    var __moduleName = context_66 && context_66.id;
    var testAssets;
    return {
        setters:[],
        execute: function() {
            exports_66("testAssets", testAssets = {
                tests: {
                    client: [],
                    server: []
                }
            });
        }
    }
});
/*
==============================================================================================
These configuration settings get called no matter what Node's process.env.NODE_ENV is set to.
==============================================================================================
*/
System.register("config/env/default", [], function(exports_67, context_67) {
    "use strict";
    var __moduleName = context_67 && context_67.id;
    var defaultConfig;
    return {
        setters:[],
        execute: function() {
            exports_67("defaultConfig", defaultConfig = {
                app: {
                    title: 'Discover Your Wonder',
                    description: 'A social art app',
                    repository: 'https://gitlab.com/projectSHAI/discoveryourwonder',
                    keywords: ['node', 'express', 'static'],
                    googleAnalyticsTrackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'GOOGLE_ANALYTICS_TRACKING_ID'
                },
                // Change to use https
                https_secure: false,
                // You will need to generate a self signed ssl certificate
                // using the generator in ./scripts or use a trusted certificate
                cert_loc: './config/sslcerts/cert.pem',
                key_loc: './config/sslcerts/key.pem',
                port: process.env.PORT || 5000,
                host: process.env.HOST || '0.0.0.0',
                // Session Cookie settings
                sessionCookie: {
                    // session expiration is set by default to 24 hours
                    maxAge: 24 * (60 * 60 * 1000),
                    // httpOnly flag makes sure the cookie is only accessed
                    // through the HTTP protocol and not JS/browser
                    httpOnly: true,
                    // secure cookie should be turned to true to provide additional
                    // layer of security so that the cookie is set only when working
                    // in HTTPS mode.
                    secure: false
                },
                // sessionSecret should be changed for security measures and concerns
                sessionSecret: process.env.SESSION_SECRET || 'APP',
                // sessionKey is set to the generic sessionId key used by PHP applications
                // for obsecurity reasons
                sessionKey: 'sessionId',
                sessionCollection: 'sessions',
                logo: 'modules/core/client/img/brand/logo.png',
                favicon: 'modules/core/client/img/brand/republicanLogo.png',
                userRoles: ['guest', 'user', 'admin'],
                uploads: {
                    profileUpload: {
                        dest: './modules/users/client/img/profile/uploads/',
                        limits: {
                            fileSize: 1 * 1024 * 1024 // Max file size in bytes (1 MB)
                        }
                    },
                    missionUpload: {
                        dest: './modules/core/client/img/photos/tmp/',
                        ftpdest: '/www/uploads/missions/',
                        limits: {
                            fileSize: 1 * 1024 * 1024 // Max file size in bytes (1 MB)
                        }
                    },
                    galleryUpload: {
                        dest: './modules/core/client/img/photos/tmp/',
                        ftpdest: '/www/uploads/photo-gallery/',
                        limits: {
                            fileSize: 1 * 1024 * 1024 // Max file size in bytes (1 MB)
                        }
                    }
                },
                dropboxAPI: {
                    access_token: 'HkqQF1z-TFAAAAAAAAAAZmGDirwwJrTBxYGxjXvjrhrvOXqbRizZJpjX7oVha7ub'
                }
            });
        }
    }
});
/*
===============================================
Used when process.env.NODE_ENV = 'development'
===============================================
//This file adds config settings and overwrites config settings in the ./default.ts file
//process.env.NODE_ENV is utilized in config/config.ts
*/
System.register("config/env/development", [], function(exports_68, context_68) {
    "use strict";
    var __moduleName = context_68 && context_68.id;
    var devEnv;
    return {
        setters:[],
        execute: function() {
            exports_68("devEnv", devEnv = {
                db: {
                    uri: 'mongodb://localhost/dreams-dev',
                    options: {
                        user: '',
                        pass: ''
                    },
                    // Enable mongoose debug mode
                    debug: process.env.MONGODB_DEBUG || false
                },
                livereload: true,
                seedDB: true,
                seedFile: '../config/lib/seed'
            });
        }
    }
});
/*
===============================================
Used when process.env.NODE_ENV = 'production'
===============================================
//This file adds config settings and overwrites config settings in the ./default.ts file
//process.env.NODE_ENV is utilized in config/config.ts
*/
System.register("config/env/production", [], function(exports_69, context_69) {
    "use strict";
    var __moduleName = context_69 && context_69.id;
    var prodEnv;
    return {
        setters:[],
        execute: function() {
            exports_69("prodEnv", prodEnv = {
                port: process.env.PORT || 8443,
                // Binding to 127.0.0.1 is safer in production.
                host: process.env.HOST || '0.0.0.0',
                db: {
                    uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/dreams-prod',
                    options: {
                        user: '',
                        pass: ''
                    },
                    // Enable mongoose debug mode
                    debug: process.env.MONGODB_DEBUG || false
                },
                livereload: false,
                seedDB: true,
                seedFile: '../config/lib/seed.prod'
            });
        }
    }
});
/*
======================================================================================
Used when process.env.NODE_ENV is equal to 'test'
======================================================================================
//This file adds config settings and overwrites config settings in the ./default.ts file
//process.env.NODE_ENV is utilized in config/config.ts
*/
System.register("config/env/test", [], function(exports_70, context_70) {
    "use strict";
    var __moduleName = context_70 && context_70.id;
    var testEnv;
    return {
        setters:[],
        execute: function() {
            exports_70("testEnv", testEnv = {
                port: process.env.PORT || 7001,
                db: {
                    uri: 'mongodb://localhost/dreams-test',
                    options: {
                        user: '',
                        pass: ''
                    },
                    // Enable mongoose debug mode
                    debug: process.env.MONGODB_DEBUG || false
                },
                livereload: false,
                seedDB: true,
                seedFile: '../config/lib/seed'
            });
        }
    }
});
System.register("config/config", ['lodash', 'glob', "config/assets/default", "config/env/default", "config/assets/development", "config/assets/production", "config/assets/test", "config/env/development", "config/env/production", "config/env/test"], function(exports_71, context_71) {
    "use strict";
    var __moduleName = context_71 && context_71.id;
    var _, glob, default_1, default_2, development_1, production_1, test_1, development_2, production_2, test_2;
    /**
     * Get files by glob patterns
     */
    function getGlobbedPaths(globPatterns, excludes) {
        // URL paths regex
        var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');
        // The output array
        var output = [];
        // If glob pattern is array then we use each pattern in a recursive way, otherwise we use glob
        if (_.isArray(globPatterns)) {
            globPatterns.forEach(function (globPattern) {
                output = _.union(output, getGlobbedPaths(globPattern, excludes));
            });
        }
        else if (_.isString(globPatterns)) {
            if (urlRegex.test(globPatterns)) {
                output.push(globPatterns);
            }
            else {
                var files = glob.sync(globPatterns);
                if (excludes) {
                    files = files.map(function (file) {
                        if (_.isArray(excludes)) {
                            for (var i in excludes) {
                                file = file.replace(excludes[i], '');
                            }
                        }
                        else {
                            file = file.replace(excludes, '');
                        }
                        return file;
                    });
                }
                output = _.union(output, files);
            }
        }
        return output;
    }
    /**
     * Initialize global configuration files
     */
    function initGlobalConfigFiles(config, assets) {
        // Appending files
        config.files = {
            server: {},
            client: {}
        };
        // Setting Globbed model files
        config.files.server.models = getGlobbedPaths(assets.server.models);
        // Setting Globbed route files
        config.files.server.routes = getGlobbedPaths(assets.server.routes);
        // Setting Globbed socket files
        // config.files.server.sockets = getGlobbedPaths(assets.server.sockets);
        // Setting Globbed js files
        config.files.client.js = getGlobbedPaths(assets.client.dist.js, 'client/').concat(getGlobbedPaths(assets.client.js, ['client/']));
        // Setting Globbed css files
        config.files.client.css = getGlobbedPaths(assets.client.dist.css, 'client/').concat(getGlobbedPaths(assets.client.css, ['client/']));
    }
    function init() {
        var environmentAssets;
        var environmentConfig;
        if (process.env.NODE_ENV === 'development') {
            environmentAssets = development_1.devAssets;
            environmentConfig = development_2.devEnv;
        }
        else if (process.env.NODE_ENV === 'production') {
            environmentAssets = production_1.prodAssets;
            environmentConfig = production_2.prodEnv;
        }
        else if (process.env.NODE_ENV === 'test') {
            environmentAssets = test_1.testAssets;
            environmentConfig = test_2.testEnv;
        }
        else {
            console.log('Error: process.env.NODE_ENV has not been set correctly, please define it as development, production, or test in a gulp task in config/gulp/gulpclass.ts');
        }
        // Merge assets
        var assets = _.merge(default_1.defaultAssets, environmentAssets);
        // Merge config files
        var config = _.merge(default_2.defaultConfig, environmentConfig);
        // Initialize global globbed files
        initGlobalConfigFiles(config, assets);
        return {
            config: config,
            assets: assets
        };
    }
    return {
        setters:[
            function (_6) {
                _ = _6;
            },
            function (glob_1) {
                glob = glob_1;
            },
            function (default_1_1) {
                default_1 = default_1_1;
            },
            function (default_2_1) {
                default_2 = default_2_1;
            },
            function (development_1_1) {
                development_1 = development_1_1;
            },
            function (production_1_1) {
                production_1 = production_1_1;
            },
            function (test_1_1) {
                test_1 = test_1_1;
            },
            function (development_2_1) {
                development_2 = development_2_1;
            },
            function (production_2_1) {
                production_2 = production_2_1;
            },
            function (test_2_1) {
                test_2 = test_2_1;
            }],
        execute: function() {
            ;
            ;
            ;
            exports_71("config", init);
        }
    }
});
/// <reference path="../../node_modules/@types/node/index.d.ts" />
System.register("config/gulp/gulpclass", ["gulpclass/Decorators"], function(exports_72, context_72) {
    "use strict";
    var __moduleName = context_72 && context_72.id;
    var Decorators_1;
    var fs, _, chalk, del, path, gulp, sass, sassLint, watch, KarmaServer, JasmineReporter, ts, embedTemplates, embedSass, runSequence, plugins, shell, imagemin, imageminJPEGOptim, imageminOptiPNG, imageminSVGO, exec, defaultAssets, Gulpfile;
    return {
        setters:[
            function (Decorators_1_1) {
                Decorators_1 = Decorators_1_1;
            }],
        execute: function() {
            fs = require('graceful-fs');
            _ = require('lodash');
            chalk = require('chalk');
            del = require('del');
            path = require('path');
            gulp = require('gulp');
            sass = require('gulp-sass');
            sassLint = require('gulp-sass-lint');
            watch = require('gulp-watch');
            KarmaServer = require('karma').Server;
            JasmineReporter = require('jasmine-spec-reporter');
            ts = require('gulp-typescript');
            embedTemplates = require('gulp-angular-embed-templates');
            embedSass = require('gulp-angular2-embed-sass');
            runSequence = require('run-sequence');
            plugins = require('gulp-load-plugins')();
            shell = require('gulp-shell');
            imagemin = require('imagemin');
            imageminJPEGOptim = require('imagemin-jpegoptim');
            imageminOptiPNG = require('imagemin-optipng');
            imageminSVGO = require('imagemin-svgo');
            exec = require('child_process').exec;
            // tslint:disable-next-line
            defaultAssets = eval(require("typescript")
                .transpile(fs
                .readFileSync("./config/assets/default.ts")
                .toString()));
            Gulpfile = (function () {
                function Gulpfile() {
                }
                // Set NODE_ENV to 'test'
                Gulpfile.prototype.env_test = function (done) {
                    process.env.NODE_ENV = 'test';
                    done();
                };
                // Set NODE_ENV to 'development'
                Gulpfile.prototype.env_dev = function (done) {
                    process.env.NODE_ENV = 'development';
                    done();
                };
                // Set NODE_ENV to 'production'
                Gulpfile.prototype.env_prod = function (done) {
                    process.env.NODE_ENV = 'production';
                    done();
                };
                //start mongo db for development mode
                Gulpfile.prototype.mongod_start = function (done, cb) {
                    exec('mongod --dbpath=/data', function (err, stdout, stderr) {
                        console.log(stdout);
                        console.log(stderr);
                        cb(err);
                    });
                    done();
                };
                Gulpfile.prototype.build_clean = function (done) {
                    del(['dist/**', '!dist', 'ngfactory/**', 'client/**/**/*.js*', 'client/**/**/*.ngfactory*', 'client/**/**/*.shim*']);
                    done();
                };
                Gulpfile.prototype.build_html = function (done) {
                    return gulp.src(defaultAssets.client.views)
                        .pipe(gulp.dest('./dist/app'));
                };
                Gulpfile.prototype.build_sass = function (done) {
                    // Brute force fix for angular material import .css .scss error
                    del('node_modules/@angular/material/core/overlay/overlay.css');
                    return gulp.src(defaultAssets.client.scss)
                        .pipe(sass().on('error', sass.logError))
                        .pipe(gulp.dest('./dist/app'));
                };
                Gulpfile.prototype.build_assets = function (done) {
                    return imagemin(defaultAssets.client.assets, 'dist/app/assets', {
                        plugins: [
                            imageminJPEGOptim(),
                            imageminOptiPNG(),
                            imageminSVGO()
                        ]
                    });
                };
                Gulpfile.prototype.compressAsset = function (file) {
                    return imagemin([file.path], 'dist/app/assets', {
                        plugins: [
                            imageminJPEGOptim(),
                            imageminOptiPNG(),
                            imageminSVGO()
                        ]
                    });
                };
                Gulpfile.prototype.deleteAsset = function (file) {
                    var loc = file.path.replace('client', 'dist\\app');
                    del(loc);
                    console.log('DELETION OF ' + loc);
                };
                Gulpfile.prototype.build_systemConf = function () {
                    return gulp.src(defaultAssets.client.system)
                        .pipe(gulp.dest('./dist/app'));
                };
                Gulpfile.prototype.build_index = function (done) {
                    return gulp.src(defaultAssets.server.system)
                        .pipe(gulp.dest('./dist'));
                };
                // Transpile client side TS files
                Gulpfile.prototype.build_client = function (done) {
                    var tsProject = ts.createProject('./tsconfig.json', { module: 'system', outFile: 'app.js' });
                    var tsResult = gulp.src(["client/**/**/!(*.spec).ts", "ngfactory/client/**/**/*.ts"])
                        .pipe(embedTemplates())
                        .pipe(embedSass())
                        .pipe(tsProject());
                    return tsResult.js.pipe(gulp.dest('./tmp'));
                };
                Gulpfile.prototype.build_server = function () {
                    var tsProject = ts.createProject('./tsconfig.json', { module: 'system', outFile: 'server.js' });
                    var tsResult = tsProject.src()
                        .pipe(tsProject());
                    return tsResult.js.pipe(gulp.dest('./tmp'));
                };
                // Transpile client test TS files
                Gulpfile.prototype.client_test = function (done) {
                    var tsProject = ts.createProject('./tsconfig.json', { module: 'system' });
                    var tsResult = gulp.src("client/**/**/*.ts")
                        .pipe(embedTemplates())
                        .pipe(embedSass())
                        .pipe(tsProject());
                    return tsResult.js.pipe(gulp.dest('./dist'));
                };
                // Transpile server test TS files
                Gulpfile.prototype.server_test = function (done) {
                    var tsProject = ts.createProject('./tsconfig.json');
                    var tsResult = tsProject.src() //`server/**/**/*.ts`
                        .pipe(tsProject());
                    return tsResult.js.pipe(gulp.dest('./dist'));
                };
                Gulpfile.prototype.build_client_test = function () {
                    return ['client_test', 'build_client_sequence'];
                };
                Gulpfile.prototype.build_server_test = function () {
                    return ['server_test'];
                };
                Gulpfile.prototype.build_client_sequence = function () {
                    return ['build_sass', 'build_html', 'build_assets', 'build_systemConf'];
                };
                Gulpfile.prototype.build_project = function () {
                    return [
                        'build_client',
                        'build_client_sequence',
                        'build_index',
                        'build_server',
                        'compress_client',
                        'compress_server',
                        'delete_tmp'
                    ];
                };
                Gulpfile.prototype.build_project_test = function () {
                    return ['client_test', 'build_client_sequence', 'build_server_test'];
                };
                Gulpfile.prototype.buildFile = function (file) {
                    var tsProject = ts.createProject('./tsconfig.json');
                    var tsResult = gulp.src([file.path])
                        .pipe(tsProject());
                    var fPath;
                    if (file.path.includes('client')) {
                        fPath = file.path.replace('client', 'dist');
                    }
                    else {
                        fPath = file.path.replace('server\\', 'dist\\');
                    }
                    fPath = fPath.substring(0, fPath.lastIndexOf('\\'));
                    return tsResult.js.pipe(gulp.dest(path.resolve(fPath)));
                };
                Gulpfile.prototype.compress_client = function () {
                    return ['compress_js', 'compress_css'];
                };
                // Compress the app.js file
                Gulpfile.prototype.compress_js = function () {
                    return gulp.src('tmp/app.js')
                        .pipe(plugins.uglify({
                        compress: {
                            sequences: true,
                            properties: true,
                            dead_code: true,
                            drop_debugger: true,
                            unsafe: false,
                            conditionals: true,
                            comparisons: true,
                            evaluate: true,
                            booleans: true,
                            loops: true,
                            unused: true,
                            hoist_funs: true,
                            hoist_vars: false,
                            if_return: true,
                            join_vars: true,
                            cascade: true,
                            side_effects: true,
                        }
                    }))
                        .pipe(gulp.dest('dist/app'));
                };
                // Compress css
                Gulpfile.prototype.compress_css = function () {
                    return gulp.src('dist/app/styles.css')
                        .pipe(plugins.uglifycss({
                        "maxLineLen": 80
                    }))
                        .pipe(gulp.dest('dist/app'));
                };
                Gulpfile.prototype.compress_server = function () {
                    return gulp.src('tmp/server.js')
                        .pipe(plugins.uglify({
                        compress: {
                            sequences: true,
                            properties: true,
                            dead_code: true,
                            drop_debugger: true,
                            unsafe: false,
                            conditionals: true,
                            comparisons: true,
                            evaluate: true,
                            booleans: true,
                            loops: true,
                            unused: true,
                            hoist_funs: true,
                            hoist_vars: false,
                            if_return: true,
                            join_vars: true,
                            cascade: true,
                            side_effects: true,
                        }
                    }))
                        .pipe(gulp.dest('dist'));
                };
                Gulpfile.prototype.delete_tmp = function () {
                    return del('tmp/**');
                };
                // Nodemon task
                Gulpfile.prototype.nodemon = function () {
                    return plugins.nodemon({
                        script: 'dist/index.js',
                        ext: 'js,html',
                        watch: defaultAssets.server.allJS
                    });
                };
                // Nodemon test task
                Gulpfile.prototype.nodemon_test = function () {
                    return plugins.nodemon({
                        script: 'dist/server/server.js',
                        ext: 'js,html',
                        watch: defaultAssets.server.allJS
                    });
                };
                Gulpfile.prototype.test_server = function () {
                    return ['server_jasmine_unit', 'server_jasmine_integration'];
                };
                // Mocha unit
                Gulpfile.prototype.server_jasmine_unit = function (done) {
                    return gulp.src(defaultAssets.server.tests.unit)
                        .pipe(plugins.jasmine({
                        reporter: new JasmineReporter()
                    }));
                };
                // Mocha integration
                Gulpfile.prototype.server_jasmine_integration = function (done) {
                    return gulp.src(defaultAssets.server.tests.integration)
                        .pipe(plugins.jasmine({
                        reporter: new JasmineReporter()
                    }));
                };
                Gulpfile.prototype.test_client = function () {
                    return ['client_karma_test'];
                };
                // Mocha integration
                Gulpfile.prototype.client_karma_test = function (done) {
                    return new KarmaServer({
                        configFile: __dirname + '/config/sys/karma.conf.js',
                        singleRun: true
                    }, done).start();
                };
                Gulpfile.prototype.protractor = function (done) {
                    return gulp.src('')
                        .pipe(shell(['npm run e2e']));
                };
                // Watch Files For Changes
                Gulpfile.prototype.watch = function () {
                    var _this = this;
                    var serverts = _.union(defaultAssets.server.allTS, defaultAssets.config.allTS);
                    // Start livereload
                    plugins.livereload.listen();
                    // Watch all server TS files to build JS
                    watch(serverts, function (file) { return runSequence('build_server', 'compress_server', 'delete_tmp'); });
                    watch(defaultAssets.server.allJS, plugins.livereload.changed);
                    // Watch all TS files in client and compiles JS files in dist
                    watch(defaultAssets.client.ts, function (file) { return runSequence('build_client', 'compress_js', 'delete_tmp'); });
                    watch(defaultAssets.client.dist.js, plugins.livereload.changed);
                    // Watch all scss files to build css is change
                    watch(defaultAssets.client.scss, function (file) { return runSequence('build_sass', 'compress_css'); });
                    watch(['client/app/**/**/*.scss'], function (file) { return runSequence('build_client', 'compress_js', 'delete_tmp'); });
                    watch(defaultAssets.client.dist.css, plugins.livereload.changed);
                    // Watch all html files to build them in dist
                    watch(defaultAssets.client.views, function (file) { return runSequence('build_html'); });
                    watch(['client/app/**/**/*.html'], function (file) { return runSequence('build_client', 'compress_js', 'delete_tmp'); });
                    watch(defaultAssets.client.dist.views, plugins.livereload.changed);
                    // Watch all client assets to compress in dist
                    watch(defaultAssets.client.assets, { events: ['add'] }, function (file) { return _this.compressAsset(file); });
                    watch(defaultAssets.client.assets, { events: ['unlink'] }, function (file) { return _this.deleteAsset(file); });
                    watch(defaultAssets.client.dist.assets, plugins.livereload.changed);
                    // Watch if system.config files are changed
                    watch(defaultAssets.client.system, function (file) { return runSequence('build_systemConf'); });
                    watch(defaultAssets.server.system, function (file) { return runSequence('build_index'); });
                    watch(['dist/index.js', 'dist/app/systemjs.config.js'], plugins.livereload.changed);
                };
                // SASS linting task
                Gulpfile.prototype.scsslint = function (done) {
                    return gulp.src(['client/styles.scss', 'client/app/components/**/*.scss'])
                        .pipe(sassLint({
                        rules: {
                            'no-css-comments': 0,
                            'single-line-per-selector': 0,
                            'property-sort-order': 0,
                            'empty-args': 0,
                            'indentation': 0,
                            'empty-line-between-blocks': 0,
                            'force-pseudo-nesting': 0,
                            'pseudo-element': 0,
                            'no-vendor-prefixes': 0,
                            'no-color-literals': 0,
                            'no-color-keywords': 0,
                            'quotes': 0,
                            'force-element-nesting': 0,
                            'no-ids': 0,
                            'leading-zero': 0,
                            'space-after-comma': 0
                        }
                    }))
                        .pipe(sassLint.format())
                        .pipe(sassLint.failOnError());
                };
                // Typescript linting task
                Gulpfile.prototype.tslint = function (done) {
                    var assets = _.union(defaultAssets.client.ts, defaultAssets.server.allTS, defaultAssets.config.allTS);
                    return gulp.src(assets)
                        .pipe(plugins.tslint({
                        // contains rules in the tslint.json format
                        configuration: "./tslint.json"
                    }))
                        .pipe(plugins.tslint.report());
                };
                // Lint CSS and JavaScript files.
                Gulpfile.prototype.lint = function () {
                    return ['scsslint', 'tslint'];
                };
                Gulpfile.prototype.exit = function (done) {
                    process.exit();
                    done();
                };
                // Run the project in development mode
                Gulpfile.prototype.default = function () {
                    return [
                        'env_dev',
                        // 'lint',
                        'mongod_start',
                        'build_clean',
                        'build_project',
                        ['nodemon', 'watch']
                    ];
                };
                // Run the project in production mode
                Gulpfile.prototype.prod = function () {
                    return [
                        'env_prod',
                        'lint',
                        'mongod_start',
                        'build_clean',
                        'build_project',
                        ['nodemon', 'watch']
                    ];
                };
                // Run the project in test mode
                Gulpfile.prototype.test = function () {
                    return [
                        'env_test',
                        'lint',
                        'mongod_start',
                        'build_clean',
                        'build_project_test',
                        'test_server',
                        'test_client',
                        'exit'
                    ];
                };
                // Run all e2e tests
                Gulpfile.prototype.test_e2e = function () {
                    return [
                        'env_test',
                        'mongod_start',
                        'build_clean',
                        'build_project',
                        'protractor',
                    ];
                };
                __decorate([
                    Decorators_1.Task(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "env_test", null);
                __decorate([
                    Decorators_1.Task(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "env_dev", null);
                __decorate([
                    Decorators_1.Task(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "env_prod", null);
                __decorate([
                    Decorators_1.Task(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object, Object]), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "mongod_start", null);
                __decorate([
                    Decorators_1.Task(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "build_clean", null);
                __decorate([
                    Decorators_1.Task(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "build_html", null);
                __decorate([
                    Decorators_1.Task(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "build_sass", null);
                __decorate([
                    Decorators_1.Task(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "build_assets", null);
                __decorate([
                    Decorators_1.Task(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "build_systemConf", null);
                __decorate([
                    Decorators_1.Task(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "build_index", null);
                __decorate([
                    Decorators_1.Task(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "build_client", null);
                __decorate([
                    Decorators_1.Task(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "build_server", null);
                __decorate([
                    Decorators_1.Task(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "client_test", null);
                __decorate([
                    Decorators_1.Task(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "server_test", null);
                __decorate([
                    Decorators_1.SequenceTask(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "build_client_test", null);
                __decorate([
                    Decorators_1.SequenceTask(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "build_server_test", null);
                __decorate([
                    Decorators_1.SequenceTask(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "build_client_sequence", null);
                __decorate([
                    Decorators_1.SequenceTask(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "build_project", null);
                __decorate([
                    Decorators_1.SequenceTask(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "build_project_test", null);
                __decorate([
                    Decorators_1.SequenceTask(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "compress_client", null);
                __decorate([
                    Decorators_1.Task(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "compress_js", null);
                __decorate([
                    Decorators_1.Task(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "compress_css", null);
                __decorate([
                    Decorators_1.Task(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "compress_server", null);
                __decorate([
                    Decorators_1.Task(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "delete_tmp", null);
                __decorate([
                    Decorators_1.Task(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "nodemon", null);
                __decorate([
                    Decorators_1.Task(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "nodemon_test", null);
                __decorate([
                    Decorators_1.SequenceTask(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "test_server", null);
                __decorate([
                    Decorators_1.Task(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "server_jasmine_unit", null);
                __decorate([
                    Decorators_1.Task(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "server_jasmine_integration", null);
                __decorate([
                    Decorators_1.SequenceTask(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "test_client", null);
                __decorate([
                    Decorators_1.Task(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "client_karma_test", null);
                __decorate([
                    Decorators_1.Task(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "protractor", null);
                __decorate([
                    Decorators_1.Task(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "watch", null);
                __decorate([
                    Decorators_1.Task(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "scsslint", null);
                __decorate([
                    Decorators_1.Task(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "tslint", null);
                __decorate([
                    Decorators_1.SequenceTask(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "lint", null);
                __decorate([
                    Decorators_1.Task(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "exit", null);
                __decorate([
                    Decorators_1.SequenceTask(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "default", null);
                __decorate([
                    Decorators_1.SequenceTask(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "prod", null);
                __decorate([
                    Decorators_1.SequenceTask(), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "test", null);
                __decorate([
                    Decorators_1.SequenceTask('test:e2e'), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], Gulpfile.prototype, "test_e2e", null);
                Gulpfile = __decorate([
                    Decorators_1.Gulpclass(), 
                    __metadata('design:paramtypes', [])
                ], Gulpfile);
                return Gulpfile;
            }());
            exports_72("Gulpfile", Gulpfile);
        }
    }
});
System.register("server/api/wonder/wonder.model", ['mongoose'], function(exports_73, context_73) {
    "use strict";
    var __moduleName = context_73 && context_73.id;
    var mongoose;
    var WonderSchema;
    return {
        setters:[
            function (mongoose_1) {
                mongoose = mongoose_1;
            }],
        execute: function() {
            WonderSchema = new mongoose.Schema({
                created: {
                    type: Date,
                    default: Date.now
                },
                name: {
                    type: String,
                    required: 'A wonder must have a name'
                },
                xcoor: {
                    type: Number,
                    required: 'A wonder needs an X coordinate'
                },
                ycoor: {
                    type: Number,
                    required: 'A wonder needs a Y coordinate'
                }
            });
            exports_73("default",mongoose.model('Wonder', WonderSchema, null, null));
        }
    }
});
System.register("server/api/wonder/wonder.controller", ['lodash', "server/api/wonder/wonder.model"], function(exports_74, context_74) {
    "use strict";
    var __moduleName = context_74 && context_74.id;
    var _, wonder_model_1;
    var counter;
    function rndInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    function updateWonder(res, wonder) {
        return function (entity) {
            if (entity) {
                entity.name = wonder.name;
                entity.created = new Date().toISOString();
                entity.xcoor = rndInt(10, 90);
                entity.ycoor = rndInt(10, 55);
                entity.save(function (err, wonder) {
                    if (err)
                        res.status(400).json(err.errors.name);
                    res.json(wonder);
                });
                counter++;
                if (counter > 9) {
                    counter = 0;
                }
            }
            return null;
        };
    }
    function respondWithResult(res, statusCode) {
        if (statusCode === void 0) { statusCode = null; }
        statusCode = statusCode || 200;
        return function (entity) {
            if (entity) {
                res.status(statusCode).json(entity);
                return null;
            }
        };
    }
    function saveUpdates(updates) {
        return function (entity) {
            var updated = _.merge(entity, updates);
            return updated.save()
                .then(function (update) {
                return update;
            });
        };
    }
    function removeEntity(res) {
        return function (entity) {
            if (entity) {
                return entity.remove()
                    .then(function () {
                    res.status(204).end();
                });
            }
        };
    }
    function handleEntityNotFound(res) {
        return function (entity) {
            if (!entity) {
                res.status(404).end();
                return null;
            }
            return entity;
        };
    }
    function handleError(res, statusCode) {
        if (statusCode === void 0) { statusCode = null; }
        statusCode = statusCode || 500;
        return function (err) {
            res.status(statusCode).send(err);
        };
    }
    // Gets a list of Wonders
    function index(req, res) {
        return wonder_model_1.default.find().exec()
            .then(respondWithResult(res))
            .catch(handleError(res));
    }
    exports_74("index", index);
    // Gets a single Wonder from the DB
    function show(req, res) {
        return wonder_model_1.default.findById(req.params.id).exec()
            .then(handleEntityNotFound(res))
            .then(respondWithResult(res))
            .catch(handleError(res));
    }
    exports_74("show", show);
    // Creates a new Wonder in the DB
    function create(req, res) {
        return wonder_model_1.default.findOne({}).sort({ created: 1 }).exec()
            .then(updateWonder(res, req.body))
            .catch(handleError(res));
    }
    exports_74("create", create);
    // Updates an existing Wonder in the DB
    function update(req, res) {
        if (req.body._id) {
            delete req.body._id;
        }
        return wonder_model_1.default.findById(req.params.id).exec()
            .then(handleEntityNotFound(res))
            .then(saveUpdates(req.body))
            .then(respondWithResult(res))
            .catch(handleError(res));
    }
    exports_74("update", update);
    // Deletes a Wonder from the DB
    function destroy(req, res) {
        return wonder_model_1.default.findById(req.params.id).exec()
            .then(handleEntityNotFound(res))
            .then(removeEntity(res))
            .catch(handleError(res));
    }
    exports_74("destroy", destroy);
    return {
        setters:[
            function (_7) {
                _ = _7;
            },
            function (wonder_model_1_1) {
                wonder_model_1 = wonder_model_1_1;
            }],
        execute: function() {
            counter = 0;
        }
    }
});
System.register("server/api/wonder/wonder.router", ["server/api/wonder/wonder.controller"], function(exports_75, context_75) {
    "use strict";
    var __moduleName = context_75 && context_75.id;
    var controller;
    var express, router;
    return {
        setters:[
            function (controller_1) {
                controller = controller_1;
            }],
        execute: function() {
            express = require('express');
            router = express.Router();
            router.get('/', controller.index);
            router.get('/:id', controller.show);
            router.post('/', controller.create);
            router.put('/:id', controller.update);
            router.patch('/:id', controller.update);
            router.delete('/:id', controller.destroy);
            exports_75("wonderRoutes", router);
        }
    }
});
System.register("server/api/user/user.model", ['crypto', 'mongoose'], function(exports_76, context_76) {
    "use strict";
    var __moduleName = context_76 && context_76.id;
    var crypto, mongoose;
    var authTypes, UserSchema, validatePresenceOf;
    return {
        setters:[
            function (crypto_1) {
                crypto = crypto_1;
            },
            function (mongoose_2) {
                mongoose = mongoose_2;
            }],
        execute: function() {
            authTypes = ['github', 'twitter', 'facebook', 'google'];
            UserSchema = new mongoose.Schema({
                created: {
                    type: Date,
                    default: Date.now
                },
                userName: {
                    type: String,
                    required: 'A user needs at least a username'
                },
                firstName: String,
                lastName: String,
                email: {
                    type: String,
                    lowercase: true,
                    required: function () {
                        if (authTypes.indexOf(this.provider) === -1) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                },
                role: {
                    type: String,
                    default: 'user'
                },
                password: {
                    type: String,
                    required: function () {
                        if (authTypes.indexOf(this.provider) === -1) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                },
                provider: String,
                salt: String,
                facebook: {},
                google: {},
                github: {},
                collections: [{
                        _id: mongoose.Schema.Types.ObjectId
                    }]
            });
            /**
             * Virtuals
             */
            // Public profile information
            UserSchema
                .virtual('profile')
                .get(function () {
                return {
                    'userName': this.userName,
                    'firstName': this.firstName,
                    'lastName': this.lastName,
                    'role': this.role
                };
            });
            // Non-sensitive info we'll be putting in the token
            UserSchema
                .virtual('token')
                .get(function () {
                return {
                    '_id': this._id,
                    'role': this.role
                };
            });
            /**
             * Validations
             */
            // Validate empty email
            UserSchema
                .path('email')
                .validate(function (email) {
                if (authTypes.indexOf(this.provider) !== -1) {
                    return true;
                }
                return email.length;
            }, 'Email cannot be blank');
            // Validate empty password
            UserSchema
                .path('password')
                .validate(function (password) {
                if (authTypes.indexOf(this.provider) !== -1) {
                    return true;
                }
                return password.length;
            }, 'Password cannot be blank');
            // Validate email is not taken
            UserSchema
                .path('email')
                .validate(function (value, respond) {
                var _this = this;
                return this.constructor.findOne({ email: value }).exec()
                    .then(function (user) {
                    if (user) {
                        if (_this.id === user.id) {
                            return respond(true);
                        }
                        return respond(false);
                    }
                    return respond(true);
                })
                    .catch(function (err) {
                    throw err;
                });
            }, 'This email address is already in use!');
            // Validate username is not taken
            UserSchema
                .path('userName')
                .validate(function (value, respond) {
                var _this = this;
                return this.constructor.findOne({ userName: value }).exec()
                    .then(function (user) {
                    if (user) {
                        if (_this.id === user.id) {
                            return respond(true);
                        }
                        return respond(false);
                    }
                    return respond(true);
                })
                    .catch(function (err) {
                    throw err;
                });
            }, 'This username is already in use!');
            validatePresenceOf = function (value) {
                return value && value.length;
            };
            /**
             * Pre-save hook
             */
            UserSchema
                .pre('save', function (next) {
                var _this = this;
                // Handle new/update passwords
                if (!this.isModified('password')) {
                    return next();
                }
                if (!validatePresenceOf(this.password)) {
                    if (authTypes.indexOf(this.provider) === -1) {
                        return next(new Error('Invalid password'));
                    }
                    else {
                        return next();
                    }
                }
                // Make salt with a callback
                this.makeSalt(function (saltErr, salt) {
                    if (saltErr) {
                        return next(saltErr);
                    }
                    _this.salt = salt;
                    _this.encryptPassword(_this.password, function (encryptErr, hashedPassword) {
                        if (encryptErr) {
                            return next(encryptErr);
                        }
                        _this.password = hashedPassword;
                        next();
                    });
                });
            });
            /**
             * Methods
             */
            UserSchema.methods = {
                /**
                 * Authenticate - check if the passwords are the same
                 *
                 * @param {String} password
                 * @param {Function} callback
                 * @return {Boolean}
                 * @api public
                 */
                authenticate: function (password, callback) {
                    var _this = this;
                    if (!callback) {
                        return this.password === this.encryptPassword(password);
                    }
                    this.encryptPassword(password, function (err, pwdGen) {
                        if (err) {
                            return callback(err);
                        }
                        if (_this.password === pwdGen) {
                            callback(null, true);
                        }
                        else {
                            callback(null, false);
                        }
                    });
                },
                /**
                 * Make salt
                 *
                 * @param {Number} byteSize Optional salt byte size, default to 16
                 * @param {Function} callback
                 * @return {String}
                 * @api public
                 */
                makeSalt: function (byteSize, callback) {
                    var defaultByteSize = 16;
                    if (typeof arguments[0] === 'function') {
                        callback = arguments[0];
                        byteSize = defaultByteSize;
                    }
                    else if (typeof arguments[1] === 'function') {
                        callback = arguments[1];
                    }
                    if (!byteSize) {
                        byteSize = defaultByteSize;
                    }
                    if (!callback) {
                        return crypto.randomBytes(byteSize).toString('base64');
                    }
                    return crypto.randomBytes(byteSize, function (err, salt) {
                        if (err) {
                            callback(err);
                        }
                        else {
                            callback(null, salt.toString('base64'));
                        }
                    });
                },
                /**
                 * Encrypt password
                 *
                 * @param {String} password
                 * @param {Function} callback
                 * @return {String}
                 * @api public
                 */
                encryptPassword: function (password, callback) {
                    if (!password || !this.salt) {
                        if (!callback) {
                            return null;
                        }
                        else {
                            return callback('Missing password or salt');
                        }
                    }
                    var defaultIterations = 10000;
                    var defaultKeyLength = 64;
                    var salt = new Buffer(this.salt, 'base64');
                    if (!callback) {
                        return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength, 'sha512')
                            .toString('base64');
                    }
                    return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, 'sha512', function (err, key) {
                        if (err) {
                            callback(err);
                        }
                        else {
                            callback(null, key.toString('base64'));
                        }
                    });
                }
            };
            exports_76("default",mongoose.model('User', UserSchema));
        }
    }
});
System.register("server/auth/auth.service", ["server/api/user/user.model", "config/config", 'jsonwebtoken'], function(exports_77, context_77) {
    "use strict";
    var __moduleName = context_77 && context_77.id;
    var user_model_1, config_1, jwt;
    var con, expressJwt, compose, validateJwt;
    /**
     * Attaches the user object to the request if authenticated
     * Otherwise returns 403
     */
    function isAuthenticated() {
        return compose()
            .use(function (req, res, next) {
            // allow access_token to be passed through query parameter as well
            if (req.query && req.query.hasOwnProperty('access_token')) {
                req.headers.authorization = 'Bearer ' + req.query.access_token;
            }
            return validateJwt(req, res, next);
        })
            .use(function (req, res, next) {
            return user_model_1.default.findById(req.user._id).exec()
                .then(function (user) {
                if (!user) {
                    return res.status(401).end();
                }
                req.user = user;
                next();
                // runnaway promise to remove node warning
                return null;
            })
                .catch(function (err) { return next(err); });
        });
    }
    exports_77("isAuthenticated", isAuthenticated);
    /**
     * Checks if the user role meets the minimum requirements of the route
     */
    function hasRole(roleRequired) {
        if (!roleRequired) {
            throw new Error('Required role needs to be set');
        }
        return compose()
            .use(isAuthenticated())
            .use(function meetsRequirements(req, res, next) {
            if (con.config.userRoles.indexOf(req.user.role) >=
                con.config.userRoles.indexOf(roleRequired)) {
                next();
            }
            else {
                res.status(403).send('Forbidden');
            }
        });
    }
    exports_77("hasRole", hasRole);
    /**
     * Returns a jwt token signed by the app secret
     */
    function signToken(id, role) {
        return jwt.sign({
            _id: id,
            role: role
        }, con.config.sessionSecret, {
            expiresIn: 60 * 60 * 5
        });
    }
    exports_77("signToken", signToken);
    /**
     * Set token cookie directly for oAuth strategies
     */
    function setTokenCookie(req, res) {
        if (!req.user) {
            return res.status(404).send('It looks like you aren\'t logged in, please try again.');
        }
        var token = signToken(req.user._id, req.user.role);
        res.cookie('token', token);
        res.redirect('/');
    }
    exports_77("setTokenCookie", setTokenCookie);
    return {
        setters:[
            function (user_model_1_1) {
                user_model_1 = user_model_1_1;
            },
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (jwt_1) {
                jwt = jwt_1;
            }],
        execute: function() {
            con = config_1.config();
            expressJwt = require('express-jwt');
            compose = require('composable-middleware');
            validateJwt = expressJwt({
                secret: con.config.sessionSecret
            });
        }
    }
});
System.register("server/api/user/user.controller", ["server/api/user/user.model", "config/config", 'jsonwebtoken'], function(exports_78, context_78) {
    "use strict";
    var __moduleName = context_78 && context_78.id;
    var user_model_2, config_2, jwt;
    var con;
    function validationError(res, statusCode) {
        if (statusCode === void 0) { statusCode = null; }
        statusCode = statusCode || 422;
        return function (err) {
            res.status(statusCode).json(err);
            return null;
        };
    }
    function handleError(res, statusCode) {
        if (statusCode === void 0) { statusCode = null; }
        statusCode = statusCode || 500;
        return function (err) {
            res.status(statusCode).send(err);
            return null;
        };
    }
    /**
     * Change a users password
     */
    function changePassword(req, res, next) {
        var userId = req.user._id;
        var oldPass = String(req.body.oldPassword);
        var newPass = String(req.body.newPassword);
        return user_model_2.default.findById(userId).exec()
            .then(function (user) {
            if (user.authenticate(oldPass)) {
                user.password = newPass;
                return user.save()
                    .then(function () {
                    res.status(204).end();
                })
                    .catch(validationError(res));
            }
            else {
                return res.status(403).end();
            }
        });
    }
    exports_78("changePassword", changePassword);
    /**
     * Get list of users
     * restriction: 'admin'
     */
    function index(req, res) {
        return user_model_2.default.find({}, '-salt -password').exec()
            .then(function (users) {
            res.status(200).json(users);
        })
            .catch(handleError(res));
    }
    exports_78("index", index);
    /**
     * Creates a new user
     */
    function create(req, res, next) {
        var newUser = new user_model_2.default(req.body);
        newUser.provider = 'local';
        newUser.role = 'user';
        return newUser.save()
            .then(function (user) {
            var token = jwt.sign({ _id: user._id }, con.config.sessionSecret, { expiresIn: 60 * 60 * 5 });
            req.headers.token = token;
            req.user = user;
            next();
            return null;
        })
            .catch(validationError(res));
    }
    exports_78("create", create);
    /**
     * Deletes a user
     * restriction: 'admin'
     */
    function destroy(req, res) {
        return user_model_2.default.findByIdAndRemove(req.params.id).exec()
            .then(function () {
            res.status(204).end();
        })
            .catch(handleError(res));
    }
    exports_78("destroy", destroy);
    /**
     * Get a single user
     */
    function show(req, res, next) {
        var userId = req.params.id;
        return user_model_2.default.findById(userId).exec()
            .then(function (user) {
            if (!user) {
                return res.status(404).end();
            }
            res.json(user.profile);
        })
            .catch(function (err) { return next(err); });
    }
    exports_78("show", show);
    /**
     * Get my info
     */
    function me(req, res, next) {
        var userId = req.user._id;
        var token = req.headers.token;
        return user_model_2.default.findOne({
            _id: userId
        }, '-salt -password').exec()
            .then(function (user) {
            if (!user) {
                return res.status(401).end();
            }
            if (token)
                res.json({ token: token, user: user });
            else
                res.json(user);
            return null;
        })
            .catch(function (err) { return next(err); });
    }
    exports_78("me", me);
    return {
        setters:[
            function (user_model_2_1) {
                user_model_2 = user_model_2_1;
            },
            function (config_2_1) {
                config_2 = config_2_1;
            },
            function (jwt_2) {
                jwt = jwt_2;
            }],
        execute: function() {
            con = config_2.config();
        }
    }
});
/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/user              ->  allUsers
 * POST    /api/user              ->  createUser
 * GET     /api/user/:id          ->  showUser
 * PUT     /api/user/:id          ->  updateUser
 * DELETE  /api/user/:id          ->  destroyUser
 */
System.register("server/api/user/user.router", ["server/auth/auth.service", "server/api/user/user.controller"], function(exports_79, context_79) {
    "use strict";
    var __moduleName = context_79 && context_79.id;
    var auth, UserController;
    var express, router;
    return {
        setters:[
            function (auth_1) {
                auth = auth_1;
            },
            function (UserController_1) {
                UserController = UserController_1;
            }],
        execute: function() {
            express = require('express');
            router = express.Router();
            router.get('/', auth.hasRole('admin'), UserController.index);
            router.delete('/:id', auth.hasRole('admin'), UserController.destroy);
            router.put('/:id/password', auth.isAuthenticated(), UserController.changePassword);
            router.post('/', UserController.create, UserController.me);
            router.get('/me', auth.isAuthenticated(), UserController.me);
            router.get('/:id', auth.isAuthenticated(), UserController.show);
            exports_79("userRoutes", router);
        }
    }
});
System.register("server/auth/local/local.router", ["server/auth/auth.service", "server/api/user/user.controller", 'passport'], function(exports_80, context_80) {
    "use strict";
    var __moduleName = context_80 && context_80.id;
    var auth_service_2, user_controller_1, passport;
    var express, router;
    return {
        setters:[
            function (auth_service_2_1) {
                auth_service_2 = auth_service_2_1;
            },
            function (user_controller_1_1) {
                user_controller_1 = user_controller_1_1;
            },
            function (passport_1) {
                passport = passport_1;
            }],
        execute: function() {
            express = require('express');
            router = express.Router();
            router.post('/', function (req, res, next) {
                passport.authenticate('local', function (err, user, info) {
                    var error = err || info;
                    if (error) {
                        res.status(401).json(error);
                        return null;
                    }
                    if (!user) {
                        res.status(404).json({ message: 'Something went wrong, please try again.' });
                        return null;
                    }
                    var token = auth_service_2.signToken(user._id, user.role);
                    req.headers.token = token;
                    req.user = user;
                    next();
                })(req, res, next);
            }, user_controller_1.me);
            exports_80("localRoutes", router);
        }
    }
});
System.register("server/auth/local/local.passport", ['passport', 'passport-local'], function(exports_81, context_81) {
    "use strict";
    var __moduleName = context_81 && context_81.id;
    var passport, passport_local_1;
    function localAuthenticate(User, email, password, done) {
        User.findOne({
            email: email.toLowerCase()
        }).exec()
            .then(function (user) {
            if (!user) {
                return done(null, false, {
                    message: 'This email is not registered!'
                });
            }
            user.authenticate(password, function (authError, authenticated) {
                if (authError) {
                    return done(authError);
                }
                if (!authenticated) {
                    return done(null, false, {
                        message: 'This password is not correct!'
                    });
                }
                else {
                    return done(null, user);
                }
            });
        })
            .catch(function (err) { return done(err); });
    }
    function setup(User, config) {
        passport.use(new passport_local_1.Strategy({
            usernameField: 'email',
            passwordField: 'password' // this is the virtual field on the model
        }, function (email, password, done) {
            return localAuthenticate(User, email, password, done);
        }));
    }
    return {
        setters:[
            function (passport_2) {
                passport = passport_2;
            },
            function (passport_local_1_1) {
                passport_local_1 = passport_local_1_1;
            }],
        execute: function() {
            exports_81("localSetup", setup);
        }
    }
});
System.register("server/auth/auth.router", ["server/api/user/user.model", "config/config", "server/auth/local/local.router", "server/auth/local/local.passport"], function(exports_82, context_82) {
    "use strict";
    var __moduleName = context_82 && context_82.id;
    var user_model_3, config_3, local_router_1, local_passport_1;
    var express, router;
    return {
        setters:[
            function (user_model_3_1) {
                user_model_3 = user_model_3_1;
            },
            function (config_3_1) {
                config_3 = config_3_1;
            },
            function (local_router_1_1) {
                local_router_1 = local_router_1_1;
            },
            function (local_passport_1_1) {
                local_passport_1 = local_passport_1_1;
            }],
        execute: function() {
            express = require('express');
            // Passport configuration
            local_passport_1.localSetup(user_model_3.default, config_3.config());
            router = express.Router();
            router.use('/local', local_router_1.localRoutes);
            exports_82("authRoutes", router);
        }
    }
});
System.register("server/routes", ["server/api/wonder/wonder.router", "server/api/user/user.router", "server/auth/auth.router"], function(exports_83, context_83) {
    "use strict";
    var __moduleName = context_83 && context_83.id;
    var wonder_router_1, user_router_1, auth_router_1;
    function routes(app) {
        // Insert routes below
        app.use('/api/wonders', wonder_router_1.wonderRoutes);
        app.use('/api/users', user_router_1.userRoutes);
        app.use('/auth', auth_router_1.authRoutes);
    }
    exports_83("routes", routes);
    return {
        setters:[
            function (wonder_router_1_1) {
                wonder_router_1 = wonder_router_1_1;
            },
            function (user_router_1_1) {
                user_router_1 = user_router_1_1;
            },
            function (auth_router_1_1) {
                auth_router_1 = auth_router_1_1;
            }],
        execute: function() {
            ;
        }
    }
});
System.register("config/lib/express", ["server/routes", "config/config", 'mongoose', 'path', 'passport'], function(exports_84, context_84) {
    "use strict";
    var __moduleName = context_84 && context_84.id;
    var routes_2, config_4, mongoose, path, passport;
    var con, express, chalk, morgan, bodyParser, errorHandler, methodOverride, cookieParser, session, MongoStore;
    function init(app) {
        //aditional app Initializations
        app.use(bodyParser.urlencoded({
            extended: false
        }));
        app.use(bodyParser.json());
        app.use(methodOverride());
        app.use(cookieParser());
        // Initialize passport and passport session
        app.use(passport.initialize());
        //initialize morgan express logger
        // NOTE: all node and custom module requests
        if (process.env.NODE_ENV !== 'test') {
            app.use(morgan('dev', {
                skip: function (req, res) {
                    var url = req.originalUrl;
                    if (url.indexOf('node') !== -1)
                        return true;
                    if (url.indexOf('custom') !== -1)
                        return true;
                    if (url.length === 1)
                        return true;
                }
            }));
        }
        app.use(session({
            secret: con.config.sessionSecret,
            saveUninitialized: true,
            resave: false,
            store: new MongoStore({
                mongooseConnection: mongoose.connection,
                db: 'dreams'
            })
        }));
        //sets the routes for all the API queries
        routes_2.routes(app);
        //exposes the client and node_modules folders to the client for file serving when client queries "/"
        app.use('/node_modules', express.static('node_modules'));
        app.use('/custom_modules', express.static('custom_modules'));
        app.use(express.static('dist/app'));
        //exposes the client and node_modules folders to the client for file serving when client queries anything, * is a wildcard
        app.use('*', express.static('node_modules'));
        app.use('*', express.static('custom_modules'));
        app.use('*', express.static('dist/app'));
        app.use(errorHandler());
        //fire's a get function when any directory is queried (* is a wildcard) by the client, sends back the index.html as a response. Angular then does the proper routing on client side
        app.get('*', function (req, res) {
            res.sendFile(path.resolve(__dirname, '../dist/app/index.html'));
        });
        return app;
    }
    return {
        setters:[
            function (routes_2_1) {
                routes_2 = routes_2_1;
            },
            function (config_4_1) {
                config_4 = config_4_1;
            },
            function (mongoose_3) {
                mongoose = mongoose_3;
            },
            function (path_1) {
                path = path_1;
            },
            function (passport_3) {
                passport = passport_3;
            }],
        execute: function() {
            con = config_4.config();
            express = require('express'), chalk = require('chalk'), morgan = require('morgan'), bodyParser = require('body-parser'), errorHandler = require('errorHandler'), methodOverride = require('method-override'), cookieParser = require('cookie-parser'), session = require('express-session'), MongoStore = require('connect-mongo')(session);
            morgan.token('method', function (req, res) {
                var method = req.method;
                switch (method) {
                    case 'GET':
                        return '[' + chalk.cyan(method) + ']';
                    default:
                        return '[' + chalk.bold.green(method) + ']';
                }
            });
            morgan.token('url', function (req, res) {
                return chalk.magenta(req.originalUrl);
            });
            ;
            exports_84("expressInit", init);
        }
    }
});
System.register("config/lib/mongoose", ['chalk', 'path', "config/config"], function(exports_85, context_85) {
    "use strict";
    var __moduleName = context_85 && context_85.id;
    var chalk, path, config_5;
    var mongoose, con, db;
    // Load the mongoose models
    function loadModels(callback) {
        // Globbing model files
        con.config.files.server.models.forEach(function (modelPath) {
            require(path.resolve(modelPath));
        });
        if (callback)
            callback();
    }
    exports_85("loadModels", loadModels);
    // Initialize Mongoose
    function connect(cb) {
        var db = mongoose.connect(con.config.db.uri, con.config.db.options, function (err) {
            // Log Error
            if (err) {
                console.error(chalk.bold.red('Could not connect to MongoDB!'));
                console.log(err);
            }
            else {
                // Enabling mongoose debug mode if required
                mongoose.set('debug', con.config.db.debug);
                // Call callback FN
                if (cb)
                    cb(db);
            }
        });
    }
    exports_85("connect", connect);
    function disconnect(cb) {
        mongoose.disconnect(function (err) {
            console.log(chalk.bold.yellow('Disconnected from MongoDB.'));
            cb(err);
        });
    }
    exports_85("disconnect", disconnect);
    return {
        setters:[
            function (chalk_1) {
                chalk = chalk_1;
            },
            function (path_2) {
                path = path_2;
            },
            function (config_5_1) {
                config_5 = config_5_1;
            }],
        execute: function() {
            mongoose = require('mongoose');
            mongoose.Promise = require('bluebird');
            con = config_5.config();
            ;
            ;
            ;
        }
    }
});
System.register("config/lib/seed.prod", ["server/api/wonder/wonder.model"], function(exports_86, context_86) {
    "use strict";
    var __moduleName = context_86 && context_86.id;
    var wonder_model_2;
    function seed() {
        wonder_model_2.default.find({}).remove()
            .then(function () {
            wonder_model_2.default.create({
                name: 'SocketIO',
                xcoor: 20,
                ycoor: 25
            }, {
                name: 'MongoDB',
                xcoor: 20,
                ycoor: 35
            }, {
                name: 'Angular 2',
                xcoor: 25,
                ycoor: 45
            }, {
                name: 'Karma',
                xcoor: 40,
                ycoor: 18
            }, {
                name: 'Express',
                xcoor: 60,
                ycoor: 65
            }, {
                name: 'Jasmine',
                xcoor: 80,
                ycoor: 55
            }, {
                name: 'OAuth',
                xcoor: 15,
                ycoor: 35
            }, {
                name: 'Node',
                xcoor: 13,
                ycoor: 40
            }, {
                name: 'Redux',
                xcoor: 15,
                ycoor: 35
            }, {
                name: 'Protractor',
                xcoor: 50,
                ycoor: 15
            });
        });
    }
    return {
        setters:[
            function (wonder_model_2_1) {
                wonder_model_2 = wonder_model_2_1;
            }],
        execute: function() {
            exports_86("seedProd", seed);
        }
    }
});
System.register("config/lib/seed", ["server/api/wonder/wonder.model", "server/api/user/user.model"], function(exports_87, context_87) {
    "use strict";
    var __moduleName = context_87 && context_87.id;
    var wonder_model_3, user_model_4;
    function seed() {
        wonder_model_3.default.find({}).remove()
            .then(function () {
            wonder_model_3.default.create({
                name: 'SocketIO',
                xcoor: 20,
                ycoor: 25
            }, {
                name: 'MongoDB',
                xcoor: 20,
                ycoor: 35
            }, {
                name: 'Angular 2',
                xcoor: 25,
                ycoor: 45
            }, {
                name: 'Karma',
                xcoor: 40,
                ycoor: 18
            }, {
                name: 'Express',
                xcoor: 60,
                ycoor: 65
            }, {
                name: 'Jasmine',
                xcoor: 80,
                ycoor: 55
            }, {
                name: 'OAuth',
                xcoor: 15,
                ycoor: 35
            }, {
                name: 'Node',
                xcoor: 13,
                ycoor: 40
            }, {
                name: 'Redux',
                xcoor: 15,
                ycoor: 35
            }, {
                name: 'Protractor',
                xcoor: 50,
                ycoor: 15
            });
        });
        user_model_4.default.find({}).remove()
            .then(function () {
            user_model_4.default.create({
                userName: 'AdMiN',
                firstName: 'admin',
                lastName: 'admin',
                email: 'admin@admin.com',
                password: 'admin1'
            }, {
                userName: 'test',
                firstName: 'testFirst',
                lastName: 'testLast',
                email: 'test@test.com',
                password: 'test'
            }, {
                userName: 'Atheteo',
                firstName: 'Jason',
                lastName: 'Thomas',
                email: 'jc.thomas4214@gmail.com',
                password: 'flight1855'
            });
        });
    }
    exports_87("seed", seed);
    return {
        setters:[
            function (wonder_model_3_1) {
                wonder_model_3 = wonder_model_3_1;
            },
            function (user_model_4_1) {
                user_model_4 = user_model_4_1;
            }],
        execute: function() {
        }
    }
});
System.register("server/api/wonder/wonder.events", ["server/api/wonder/wonder.model"], function(exports_88, context_88) {
    "use strict";
    var __moduleName = context_88 && context_88.id;
    var wonder_model_4;
    var EventEmitter, WonderEvents, events;
    function emitEvent(event) {
        return function (doc) {
            WonderEvents.emit(event + ':' + doc._id, doc);
            WonderEvents.emit(event, doc);
        };
    }
    return {
        setters:[
            function (wonder_model_4_1) {
                wonder_model_4 = wonder_model_4_1;
            }],
        execute: function() {
            EventEmitter = require('events').EventEmitter;
            WonderEvents = new EventEmitter();
            // Set max event listeners (0 == unlimited)
            WonderEvents.setMaxListeners(0);
            // Model events
            events = {
                'save': 'save',
                'remove': 'remove'
            };
            // Register the event emitter to the model events
            for (var e in events) {
                var event_1 = events[e];
                wonder_model_4.default.schema.post(e, emitEvent(event_1));
            }
            exports_88("default",WonderEvents);
        }
    }
});
/**
 * Broadcast updates to client when the model changes
 */
System.register("server/api/wonder/wonder.socket", ["server/api/wonder/wonder.events"], function(exports_89, context_89) {
    "use strict";
    var __moduleName = context_89 && context_89.id;
    var wonder_events_1;
    var events;
    function register(socket) {
        // Bind model events to socket events
        for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
            var event_2 = events[i];
            var listener = createListener('Wonder:' + event_2, socket);
            wonder_events_1.default.on(event_2, listener);
            socket.on('disconnect', removeListener(event_2, listener));
        }
    }
    function createListener(event, socket) {
        return function (doc) {
            socket.emit(event, doc);
        };
    }
    function removeListener(event, listener) {
        return function () {
            wonder_events_1.default.removeListener(event, listener);
        };
    }
    return {
        setters:[
            function (wonder_events_1_1) {
                wonder_events_1 = wonder_events_1_1;
            }],
        execute: function() {
            // Model events to emit
            events = ['save', 'remove'];
            exports_89("wonderRegister", register);
        }
    }
});
System.register("config/lib/socketio", ["config/config", "server/api/wonder/wonder.socket"], function(exports_90, context_90) {
    "use strict";
    var __moduleName = context_90 && context_90.id;
    var config_6, wonder_socket_1;
    var con;
    // When the user disconnects.. perform this
    function onDisconnect(socket) {
    }
    // When the user connects.. perform this
    function onConnect(socket) {
        // When the client emits 'info', this listens and executes
        socket.on('info', function (data) {
            socket.log(JSON.stringify(data, null, 2));
        });
        // Insert sockets below
        wonder_socket_1.wonderRegister(socket);
    }
    function init(socketio) {
        // socket.io (v1.x.x) is powered by debug.
        // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
        //
        // ex: DEBUG: "http*,socket.io:socket"
        // We can authenticate socket.io users and access their token through socket.decoded_token
        //
        // 1. You will need to send the token in `client/components/socket/socket.service.js`
        //
        // 2. Require authentication here:
        // socketio.use(require('socketio-jwt').authorize({
        //   secret: config.secrets.session,
        //   handshake: true
        // }));
        socketio.on('connection', function (socket) {
            socket.address = socket.request.connection.remoteAddress +
                ':' + socket.request.connection.remotePort;
            socket.connectedAt = new Date();
            socket.log = function () {
                var data = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    data[_i - 0] = arguments[_i];
                }
                console.log.apply(console, ["SocketIO " + socket.nsp.name + " [" + socket.address + "]"].concat(data));
            };
            // Call onDisconnect.
            socket.on('disconnect', function () {
                onDisconnect(socket);
                socket.log('DISCONNECTED');
            });
            // Call onConnect.
            onConnect(socket);
            socket.log('CONNECTED');
        });
    }
    return {
        setters:[
            function (config_6_1) {
                config_6 = config_6_1;
            },
            function (wonder_socket_1_1) {
                wonder_socket_1 = wonder_socket_1_1;
            }],
        execute: function() {
            con = config_6.config();
            exports_90("socketInit", init);
        }
    }
});
System.register("server/server", ['chalk', 'graceful-fs', 'http', 'https', "config/config", "config/lib/socketio", "config/lib/express", "config/lib/mongoose", "config/lib/seed", "config/lib/seed.prod"], function(exports_91, context_91) {
    "use strict";
    var __moduleName = context_91 && context_91.id;
    var chalk, fs, http, https, config_7, socketio_1, express_1, mongoose_4, seed_1, seed_prod_1;
    var express, con, app, init;
    return {
        setters:[
            function (chalk_2) {
                chalk = chalk_2;
            },
            function (fs_1) {
                fs = fs_1;
            },
            function (http_6) {
                http = http_6;
            },
            function (https_1) {
                https = https_1;
            },
            function (config_7_1) {
                config_7 = config_7_1;
            },
            function (socketio_1_1) {
                socketio_1 = socketio_1_1;
            },
            function (express_1_1) {
                express_1 = express_1_1;
            },
            function (mongoose_4_1) {
                mongoose_4 = mongoose_4_1;
            },
            function (seed_1_1) {
                seed_1 = seed_1_1;
            },
            function (seed_prod_1_1) {
                seed_prod_1 = seed_prod_1_1;
            }],
        execute: function() {
            express = require('express');
            con = config_7.config();
            // Initialize express
            app = express();
            //seed db
            if (con.config.seedDB) {
                if (process.env.NODE_ENV === 'production') {
                    seed_prod_1.seedProd();
                }
                else {
                    seed_1.seed();
                }
            }
            // Initialize models
            mongoose_4.loadModels();
            init = function init(callback) {
                mongoose_4.connect(function (db) {
                    // Initialize http server
                    var server = http.createServer(app);
                    // If specified in the default assets, https will be used
                    if (con.config.https_secure) {
                        var credentials = {
                            key: fs.readFileSync(con.config.key_loc, 'utf8'),
                            cert: fs.readFileSync(con.config.cert_loc, 'utf8')
                        };
                        server = https.createServer(credentials, app);
                    }
                    // Initialize the socketio with the respective server
                    var socketio = require('socket.io')(server, {
                        // serveClient: process.env.NODE_ENV !== 'production',
                        path: '/socket.io'
                    });
                    // Start configure the socketio
                    socketio_1.socketInit(socketio);
                    // Initialize express features
                    express_1.expressInit(app);
                    return callback ? callback(app, db, con, server) : app;
                });
            };
            init(function (app, db, con, server) {
                server.listen(con.config.port, con.config.host, function () {
                    var host = server.address().address;
                    var port = server.address().port;
                    if (process.env.NODE_ENV !== 'test') {
                        // Logging initialization
                        console.log('');
                        console.log(chalk.bold.cyan('\tProject Name:\t\t\t' + con.config.app.title));
                        console.log(chalk.bold.cyan('\tEnvironment:\t\t\t' + process.env.NODE_ENV));
                        console.log(chalk.bold.cyan('\tDatabase:\t\t\t' + con.config.db.uri));
                        console.log('');
                        if (!con.config.https_secure) {
                            console.log(chalk.bold.magenta('\tHTTP Server'));
                            console.log(chalk.bold.gray('\tAddress:\t\t\t' + 'http://localhost:' + port));
                        }
                        else {
                            console.log(chalk.bold.magenta('\tHTTPS Server'));
                            console.log(chalk.bold.gray('\tAddress:\t\t\t' + 'https://localhost:' + port));
                        }
                        console.log(chalk.bold.gray('\tPort:\t\t\t\t' + port));
                        console.log(chalk.bold.gray('\tHost:\t\t\t\t' + host));
                        console.log('');
                    }
                });
            });
            // Set address for jasmine supertest
            // There was problems with just 'app'
            app.set('address', 'http://localhost:' + con.config.port);
            exports_91("default",app);
        }
    }
});
System.register("server/api/user/user.integration", ["server/server", 'supertest', "server/api/user/user.model"], function(exports_92, context_92) {
    "use strict";
    var __moduleName = context_92 && context_92.id;
    var server_1, request, user_model_5;
    var addr;
    return {
        setters:[
            function (server_1_1) {
                server_1 = server_1_1;
            },
            function (request_1) {
                request = request_1;
            },
            function (user_model_5_1) {
                user_model_5 = user_model_5_1;
            }],
        execute: function() {
            addr = server_1.default.get('address');
            describe('User API:', function () {
                var user;
                var token;
                // Clear users before testing
                beforeAll(function () {
                    user = new user_model_5.default({
                        userName: 'MrFakie',
                        email: 'Fakie@mrfake.com',
                        password: 'mrfakie'
                    });
                    return user.save();
                });
                describe('GET /api/users/me', function () {
                    beforeAll(function (done) {
                        request(addr)
                            .post('/auth/local')
                            .send({
                            email: 'Fakie@mrfake.com',
                            password: 'mrfakie'
                        })
                            .expect(200)
                            .expect('Content-Type', /json/)
                            .end(function (err, res) {
                            if (err) {
                                done.fail(err);
                            }
                            else {
                                token = res.body.token;
                                done();
                            }
                        });
                    });
                    it('should respond with a user profile when authenticated', function (done) {
                        request(addr)
                            .get('/api/users/me')
                            .set('authorization', 'Bearer ' + token)
                            .expect(200)
                            .expect('Content-Type', /json/)
                            .end(function (err, res) {
                            if (err) {
                                done.fail(err);
                            }
                            else {
                                expect(res.body._id.toString()).toEqual(user._id.toString());
                                expect(res.body.userName).toEqual(user.userName);
                                expect(res.body.firstName).toEqual(user.firstName);
                                expect(res.body.lastName).toEqual(user.lastName);
                                expect(res.body.email).toEqual(user.email);
                                done();
                            }
                        });
                    });
                    it('should respond with a 401 when not authenticated', function (done) {
                        request(addr)
                            .get('/api/users/me')
                            .expect(401)
                            .end(function (err, res) {
                            if (err) {
                                done.fail(err);
                            }
                            else {
                                done();
                            }
                        });
                    });
                });
            });
        }
    }
});
System.register("server/api/user/user.spec", ['proxyquire', 'sinon'], function(exports_93, context_93) {
    "use strict";
    var __moduleName = context_93 && context_93.id;
    var proxyquire, sinon;
    var pq, userCtrlStub, authServiceStub, routerStub, userIndex;
    return {
        setters:[
            function (proxyquire_1) {
                proxyquire = proxyquire_1;
            },
            function (sinon_1) {
                sinon = sinon_1;
            }],
        execute: function() {
            pq = proxyquire.noPreserveCache();
            userCtrlStub = {
                index: 'userCtrl.index',
                destroy: 'userCtrl.destroy',
                me: 'userCtrl.me',
                changePassword: 'userCtrl.changePassword',
                show: 'userCtrl.show',
                create: 'userCtrl.create'
            };
            authServiceStub = {
                isAuthenticated: function () {
                    return 'authService.isAuthenticated';
                },
                hasRole: function (role) {
                    return 'authService.hasRole.' + role;
                }
            };
            routerStub = {
                get: sinon.spy(),
                put: sinon.spy(),
                post: sinon.spy(),
                delete: sinon.spy()
            };
            // require the index with our stubbed out modules
            userIndex = pq('./user.router.js', {
                'express': {
                    Router: function () {
                        return routerStub;
                    }
                },
                './user.controller': userCtrlStub,
                '../../auth/auth.service': authServiceStub
            });
            describe('User API Router:', function () {
                it('should return an express router instance', function () {
                    expect(userIndex.userRoutes).toEqual(routerStub);
                });
                describe('GET /api/users', function () {
                    it('should verify admin role and route to user.controller.index', function () {
                        expect(routerStub.get.withArgs('/', 'authService.hasRole.admin', 'userCtrl.index').calledOnce)
                            .toBe(true);
                    });
                });
                describe('DELETE /api/users/:id', function () {
                    it('should verify admin role and route to user.controller.destroy', function () {
                        expect(routerStub.delete.withArgs('/:id', 'authService.hasRole.admin', 'userCtrl.destroy').calledOnce)
                            .toBe(true);
                    });
                });
                describe('GET /api/users/me', function () {
                    it('should be authenticated and route to user.controller.me', function () {
                        expect(routerStub.get.withArgs('/me', 'authService.isAuthenticated', 'userCtrl.me').calledOnce)
                            .toBe(true);
                    });
                });
                describe('PUT /api/users/:id/password', function () {
                    it('should be authenticated and route to user.controller.changePassword', function () {
                        expect(routerStub.put.withArgs('/:id/password', 'authService.isAuthenticated', 'userCtrl.changePassword').calledOnce)
                            .toBe(true);
                    });
                });
                describe('GET /api/users/:id', function () {
                    it('should be authenticated and route to user.controller.show', function () {
                        expect(routerStub.get.withArgs('/:id', 'authService.isAuthenticated', 'userCtrl.show').calledOnce)
                            .toBe(true);
                    });
                });
                describe('POST /api/users', function () {
                    it('should route to user.controller.create', function () {
                        expect(routerStub.post.withArgs('/', 'userCtrl.create').calledOnce)
                            .toBe(true);
                    });
                });
            });
        }
    }
});
System.register("server/api/wonder/wonder.integration", ["server/server", 'supertest'], function(exports_94, context_94) {
    "use strict";
    var __moduleName = context_94 && context_94.id;
    var server_2, request;
    var addr;
    return {
        setters:[
            function (server_2_1) {
                server_2 = server_2_1;
            },
            function (request_2) {
                request = request_2;
            }],
        execute: function() {
            addr = server_2.default.get('address');
            describe('Wonder API:', function () {
                var newWonder;
                var wonders;
                var inputs = [1, 43, 2, 35, 65, 36, 10, 57, 32, 45, 90, 79, 32];
                describe('POST /api/wonders', function () {
                    for (var counter = 0; counter < inputs.length; counter++) {
                        (function (input) {
                            return beforeAll(function (done) {
                                request(addr)
                                    .post('/api/wonders')
                                    .send({
                                    name: 'wonder: ' + input
                                })
                                    .expect(200)
                                    .expect('Content-Type', /json/)
                                    .end(function (err, res) {
                                    if (err) {
                                        done.fail(err);
                                    }
                                    expect(res.body.name).toBe('wonder: ' + input);
                                    done();
                                });
                            });
                        })(inputs[counter]);
                    }
                    it('should respond back each query with inputted wonder', function () {
                        expect(true).toBe(true);
                    });
                });
                describe('GET /api/wonders', function () {
                    beforeAll(function (done) {
                        request(addr)
                            .get('/api/wonders')
                            .expect(200)
                            .expect('Content-Type', /json/)
                            .end(function (err, res) {
                            if (err) {
                                done.fail(err);
                            }
                            wonders = res.body;
                            done();
                        });
                    });
                    it('should respond with JSON array', function () {
                        expect(wonders).toEqual(jasmine.any(Array));
                    });
                    it('wonders should equal the original input array', function () {
                        for (var i = 0; i < 10; i++) {
                            (function (input, counter) {
                                return expect(wonders[counter].name).toBe('wonder: ' + input);
                            })(inputs[i + 3], (i + 3) % 10);
                        }
                    });
                });
            });
        }
    }
});
System.register("server/api/wonder/wonder.spec", ['proxyquire', 'sinon'], function(exports_95, context_95) {
    "use strict";
    var __moduleName = context_95 && context_95.id;
    var proxyquire, sinon;
    var pq, wonderCtrlStub, wonderRouterStub, wonderIndex;
    return {
        setters:[
            function (proxyquire_2) {
                proxyquire = proxyquire_2;
            },
            function (sinon_2) {
                sinon = sinon_2;
            }],
        execute: function() {
            pq = proxyquire.noPreserveCache();
            wonderCtrlStub = {
                index: 'wonderCtrl.index',
                show: 'wonderCtrl.show',
                create: 'wonderCtrl.create',
                update: 'wonderCtrl.update',
                destroy: 'wonderCtrl.destroy'
            };
            wonderRouterStub = {
                get: sinon.spy(),
                put: sinon.spy(),
                patch: sinon.spy(),
                post: sinon.spy(),
                delete: sinon.spy()
            };
            // require the index with our stubbed out modules
            wonderIndex = pq('./wonder.router.js', {
                'express': {
                    Router: function () {
                        return wonderRouterStub;
                    }
                },
                './wonder.controller': wonderCtrlStub
            });
            describe('Wonder API Router:', function () {
                it('should return an express router instance', function () {
                    expect(wonderIndex.wonderRoutes).toEqual(wonderRouterStub);
                });
                describe('GET /api/wonders', function () {
                    it('should route to wonder.controller.index', function () {
                        expect(wonderRouterStub.get.withArgs('/', 'wonderCtrl.index').calledOnce)
                            .toBe(true);
                    });
                });
                describe('GET /api/wonders/:id', function () {
                    it('should route to wonder.controller.show', function () {
                        expect(wonderRouterStub.get.withArgs('/:id', 'wonderCtrl.show').calledOnce)
                            .toBe(true);
                    });
                });
                describe('POST /api/wonders', function () {
                    it('should route to wonder.controller.create', function () {
                        expect(wonderRouterStub.post.withArgs('/', 'wonderCtrl.create').calledOnce)
                            .toBe(true);
                    });
                });
                describe('PUT /api/wonders/:id', function () {
                    it('should route to wonder.controller.update', function () {
                        expect(wonderRouterStub.put.withArgs('/:id', 'wonderCtrl.update').calledOnce)
                            .toBe(true);
                    });
                });
                describe('PATCH /api/wonders/:id', function () {
                    it('should route to wonder.controller.update', function () {
                        expect(wonderRouterStub.patch.withArgs('/:id', 'wonderCtrl.update').calledOnce)
                            .toBe(true);
                    });
                });
                describe('DELETE /api/wonders/:id', function () {
                    it('should route to wonder.controller.destroy', function () {
                        expect(wonderRouterStub.delete.withArgs('/:id', 'wonderCtrl.destroy').calledOnce)
                            .toBe(true);
                    });
                });
            });
        }
    }
});
//# sourceMappingURL=C:/Users/Jason Thomas/Documents/dev/webdev/GOAT/app.js.map