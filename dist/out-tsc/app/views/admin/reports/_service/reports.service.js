"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var environment_1 = require("../../../../../environments/environment");
var authentication_service_1 = require("../../../../_services/authentication.service");
var http_1 = require("@angular/common/http");
var ReportsService = /** @class */ (function () {
    function ReportsService(http, authServ) {
        this.http = http;
        this.authServ = authServ;
    }
    ReportsService.prototype.getExtensionsAndGroups = function () {
        var options = this.authServ.getRequestOpions();
        return this.http.get(environment_1.environment.apiUrl + "/admin/reports", options);
    };
    ReportsService.prototype.getGroupPerformance = function (data) {
        var options = this.authServ.getRequestOpions();
        if (data.time != "choosely")
            return this.http.get(environment_1.environment.apiUrl + "/admin/reports/group/" + data.time, options);
        else
            return this.http.post(environment_1.environment.apiUrl + "/admin/reports/group/choosely", data, options);
    };
    ReportsService.prototype.getCompareGroupsPeformance = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.get(environment_1.environment.apiUrl + "/admin/reports/group/compare/chart/performance", options);
        if (data.time != "choosely")
            return this.http.get(environment_1.environment.apiUrl + "/admin/reports/group/" + data.time, options);
        else
            return this.http.post(environment_1.environment.apiUrl + "/admin/reports/group/choosely", data, options);
    };
    ReportsService.prototype.getCompareGroupsCalls = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.post(environment_1.environment.apiUrl + "/admin/reports/group/compare/chart/calls", data, options);
    };
    ReportsService.prototype.getGroupsCallsData = function (data) {
        var options = this.authServ.getRequestOpions();
        debugger;
        if (data.time != "choosely")
            return this.http.get(environment_1.environment.apiUrl + "/admin/reports/group/" + data.time, options);
        else
            return this.http.post(environment_1.environment.apiUrl + "/admin/reports/group/choosely", data, options);
    };
    ReportsService.prototype.getGroupsPerformance = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.post(environment_1.environment.apiUrl + "/admin/reports/group/compare/chart/performance", data, options);
    };
    ReportsService.prototype.getSystemPerformance = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.post(environment_1.environment.apiUrl + "/admin/reports/chart/global/number/calls", data, options);
    };
    //calls details
    ReportsService.prototype.getCallsDetails = function () {
        var options = this.authServ.getRequestOpions();
        return this.http.get(environment_1.environment.apiUrl + "/admin/reports/cdr", options);
    };
    ReportsService.prototype.filterCallsDetails = function (data) {
        var options = this.authServ.getRequestOpions();
        if (!data.page) {
            return this.http.post(environment_1.environment.apiUrl + "/admin/reports/cdr", data, options);
        }
        else {
            return this.http.post(environment_1.environment.apiUrl + "/admin/reports/cdr/?page=" + data.page, data, options);
        }
    };
    //operator
    ReportsService.prototype.getAllOperator = function () {
        var options = this.authServ.getRequestOpions();
        return this.http.get(environment_1.environment.apiUrl + "/admin/report/operators", options);
    };
    ReportsService.prototype.getOperatorData = function (id) {
        var options = this.authServ.getRequestOpions();
        return this.http.get(environment_1.environment.apiUrl + "/admin/report/operators/" + id, options);
    };
    ReportsService.prototype.getOperatorPefrormance = function (id) {
        var options = this.authServ.getRequestOpions();
        return this.http.get(environment_1.environment.apiUrl + "/admin/report/operators/performance/" + id, options);
    };
    ReportsService.prototype.getOperatorPefrormanceWithDate = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.post(environment_1.environment.apiUrl +
            "/admin/report/operators/performance/todate/" +
            data.id, data, options);
    };
    ReportsService.prototype.getOperatorMonthlyPefrormance = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.get(environment_1.environment.apiUrl +
            "/admin/report/operators/performance/month/" +
            data.id, options);
    };
    //queues
    ReportsService.prototype.getQueuesData = function () {
        var options = this.authServ.getRequestOpions();
        return this.http.get(environment_1.environment.apiUrl + "/admin/reports/queues", options);
    };
    ReportsService.prototype.getQueuesServicelevel = function () {
        var options = this.authServ.getRequestOpions();
        return this.http.get(environment_1.environment.apiUrl + "/admin/reports/queues/chart/servicelevel", options);
    };
    ReportsService.prototype.getQueuesChartCalls = function () {
        var options = this.authServ.getRequestOpions();
        return this.http.get(environment_1.environment.apiUrl + "/admin/reports/queues/chart/calls", options);
    };
    ReportsService.prototype.gerChartsData = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.post(environment_1.environment.apiUrl + "/admin/reports/queues/charts", data, options);
    };
    ReportsService.prototype.getQueuesCharTime = function () {
        var options = this.authServ.getRequestOpions();
        return this.http.get(environment_1.environment.apiUrl + "/admin/reports/queues/chart/time", options);
    };
    ReportsService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: "root"
        }),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient,
            authentication_service_1.AuthenticationService])
    ], ReportsService);
    return ReportsService;
}());
exports.ReportsService = ReportsService;
//# sourceMappingURL=reports.service.js.map