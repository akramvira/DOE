"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var environment_1 = require("../../../../../environments/environment");
var authentication_service_1 = require("../../../../_services/authentication.service");
var http_1 = require("@angular/common/http");
var WebService = /** @class */ (function () {
    function WebService(http, authServ) {
        this.http = http;
        this.authServ = authServ;
    }
    WebService.prototype.getExtensionsAndGroups = function () {
        var options = this.authServ.getRequestOpions();
        return this.http.get(environment_1.environment.apiUrl + "/admin/reports/departments", options);
    };
    WebService.prototype.getGroupPerformance = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.post(environment_1.environment.apiUrl + "/admin/reports/chart/subgroup/filters", data, options);
    };
    WebService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient,
            authentication_service_1.AuthenticationService])
    ], WebService);
    return WebService;
}());
exports.WebService = WebService;
//# sourceMappingURL=web.service.js.map