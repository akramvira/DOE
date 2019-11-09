"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/common/http");
var authentication_service_1 = require("./authentication.service");
var environment_1 = require("../../environments/environment");
var SharedService = /** @class */ (function () {
    function SharedService(http, authServ) {
        this.http = http;
        this.authServ = authServ;
        this.minMaxTime = new rxjs_1.BehaviorSubject({
            min: '1397/01/01',
            max: '1399/01/01'
        });
    }
    SharedService.prototype.setMinMaxDate = function () {
        var _this = this;
        var token = this.authServ.getLSToken();
        var headers = new http_1.HttpHeaders({
            Authorization: "Bearer " + token,
            "Content-Type": "application/json"
        });
        this.http.get(environment_1.environment.apiUrl + "/admin/reports/date", {
            headers: headers
        }).subscribe(function (data) {
            _this.minMaxTime.next(data['data']);
        }, function (error) {
            _this.authServ.handdleAuthErrors(error);
        });
    };
    SharedService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: "root"
        }),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient,
            authentication_service_1.AuthenticationService])
    ], SharedService);
    return SharedService;
}());
exports.SharedService = SharedService;
//# sourceMappingURL=shared.service.js.map