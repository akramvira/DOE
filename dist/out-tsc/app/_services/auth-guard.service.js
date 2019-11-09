"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var authentication_service_1 = require("./authentication.service");
var router_1 = require("@angular/router");
var globals_1 = require("./globals");
var rxjs_1 = require("rxjs");
var AuthGuardService = /** @class */ (function () {
    function AuthGuardService(authService, router, gl) {
        this.authService = authService;
        this.router = router;
        this.gl = gl;
        this.loading = false;
    }
    AuthGuardService.prototype.canActivate = function (next) {
        var _this = this;
        this.loading = true;
        return rxjs_1.Observable.create(function (observer) {
            var menu = JSON.parse(localStorage.getItem("menu"));
            if (menu) {
                var res = menu.includes(next.data.accessName);
                if (res) {
                    observer.next(true);
                }
                else {
                    _this.router.navigate(["/403"]);
                    observer.next(false);
                }
            }
            else {
                _this.authService.getUserMenues().subscribe(function (data) {
                    localStorage.setItem("menu", JSON.stringify(data["data"]));
                    menu = data['data'];
                    var res = menu.includes(next.data.accessName);
                    if (res) {
                        observer.next(true);
                    }
                    else {
                        _this.router.navigate(["/403"]);
                        observer.next(false);
                    }
                }, function (error) {
                    _this.authService.handdleAuthErrors(error);
                    _this.router.navigate(["/403"]);
                    observer.next(false);
                });
            }
        });
    };
    AuthGuardService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: "root"
        }),
        tslib_1.__metadata("design:paramtypes", [authentication_service_1.AuthenticationService,
            router_1.Router,
            globals_1.Globals])
    ], AuthGuardService);
    return AuthGuardService;
}());
exports.AuthGuardService = AuthGuardService;
//# sourceMappingURL=auth-guard.service.js.map