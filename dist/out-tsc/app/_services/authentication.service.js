"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var environment_1 = require("../../environments/environment");
var router_1 = require("@angular/router");
var ngx_toastr_1 = require("ngx-toastr");
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(http, router, toaster) {
        this.http = http;
        this.router = router;
        this.toaster = toaster;
        this.currentUserSubject = new rxjs_1.BehaviorSubject({
            token: localStorage.getItem("currentUser")
        });
        //this.currentUserMenuAccess = new BehaviorSubject<any>([]);
        this.currentUser = this.currentUserSubject.asObservable();
    }
    Object.defineProperty(AuthenticationService.prototype, "currentUserValue", {
        get: function () {
            return this.currentUserSubject.value;
        },
        enumerable: true,
        configurable: true
    });
    AuthenticationService.prototype.currentUserType = function () {
        return "admin";
    };
    AuthenticationService.prototype.login = function (username, password) {
        var _this = this;
        this.getUserMenues();
        return this.http
            .post(environment_1.environment.apiUrl + "/login", {
            username: username,
            password: password
        })
            .pipe(operators_1.map(function (user) {
            console.log(user);
            user = user.data;
            if (user.token) {
                localStorage.setItem("userToken", user.token);
                _this.currentUserSubject.next(user.token);
            }
            return user;
        }));
    };
    AuthenticationService.prototype.logout = function () {
        // remove user from local storage to log user out
        var options = this.getRequestOpions();
        localStorage.removeItem("currentUser");
        this.currentUserSubject.next(null);
        this.router.navigate(["/login"]);
        return this.http.post(environment_1.environment.apiUrl + "/logout", {}, options);
    };
    AuthenticationService.prototype.isAuthenticated = function () {
        var options = this.getRequestOpions();
        return this.http.get(environment_1.environment.apiUrl + "/login", options);
    };
    AuthenticationService.prototype.getUserData = function () {
        var options = this.getRequestOpions();
        return this.http.get(environment_1.environment.apiUrl + "/admin/userdata", options);
    };
    AuthenticationService.prototype.saveUserData = function (data) {
        var _this = this;
        return this.http.post(environment_1.environment.apiUrl + "/userdata", {}).pipe(operators_1.map(function (user) {
            user = user.data;
            if (user.token) {
                localStorage.setItem("userToken", user.token);
                _this.currentUserSubject.next(user.token);
            }
            return user;
        }));
    };
    AuthenticationService.prototype.getLSToken = function () {
        return localStorage.getItem("userToken") || null;
    };
    AuthenticationService.prototype.getUserMenues = function () {
        var _this = this;
        var userToken = this.getLSToken();
        var option = this.getRequestOpions();
        var res = this.http.get(environment_1.environment.apiUrl + "/admin/menu", option);
        res.subscribe(function (data) {
            _this.currentUserMenuAccess = new rxjs_1.BehaviorSubject(data["data"]);
        });
        return res;
    };
    AuthenticationService.prototype.getUsersMenuAccess = function () {
        return this.currentUserMenuAccess ? this.currentUserMenuAccess.value : [];
    };
    AuthenticationService.prototype.getRequestOpions = function (hasFile) {
        if (hasFile === void 0) { hasFile = false; }
        var token = this.getLSToken();
        var headers;
        if (hasFile) {
            headers = new http_1.HttpHeaders({
                Authorization: "Bearer " + token
            });
        }
        else {
            headers = new http_1.HttpHeaders({
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            });
        }
        return { headers: headers };
    };
    AuthenticationService.prototype.handdleAuthErrors = function (error) {
        // 401 is login but no access to  resource
        // expired 401
        if (error["status"] == 401) {
            //user in not authorized
            this.toaster.clear();
            // this.toaster.error('شما از سیستم خارج شدید.');
            // console.log('شما از سیستم خارج شدید.');
            this.logout();
        }
        else if (error["status"] == 500 ||
            error["status"] == 502 ||
            error["status"] == 0) {
            this.toaster.clear();
            this.toaster.error("خطایی در سمت سرور رخ داده است.", "پیغام سیستم");
        }
        else if (error["status"] == 422) {
            this.toaster.clear();
            var errorString = "";
            var errorsList = error.error.errors;
            for (var i in errorsList) {
                errorString += "-" + errorsList[i].join(",") + ",";
            }
            this.toaster.error(errorString);
        }
        else if (error["status"] == 404) {
            this.toaster.clear();
            this.toaster.warning("درخواست نا معتبر می باشد.");
            // this.router.navigate(['/404']);
        }
        else if (error["status"] == 400) {
            this.toaster.clear();
            this.toaster.warning("نام یا نام کاربری اشتباه است.");
            // this.router.navigate(['/404']);
        }
        else {
            this.toaster.clear();
            this.toaster.warning("درخواست نا معتبر می باشد. کد خطا:" + error['status']);
        }
        //console.clear();
    };
    AuthenticationService = tslib_1.__decorate([
        core_1.Injectable({ providedIn: "root" }),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient,
            router_1.Router,
            ngx_toastr_1.ToastrService])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map