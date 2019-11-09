"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var environment_1 = require("../../../../../environments/environment");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var authentication_service_1 = require("../../../../_services/authentication.service");
var SettingsService = /** @class */ (function () {
    function SettingsService(http, authServ) {
        this.http = http;
        this.authServ = authServ;
    }
    SettingsService.prototype.getSettingsdata = function () {
        var options = this.authServ.getRequestOpions();
        return this.http.get(environment_1.environment.apiUrl + '/admin/setting', options);
    };
    SettingsService.prototype.getOtherData = function () {
        var options = this.authServ.getRequestOpions();
        return this.http.get(environment_1.environment.apiUrl + '/admin/setting/otherdata', options);
    };
    SettingsService.prototype.setOtherData = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.post(environment_1.environment.apiUrl + "/admin/setting/otherdata", data, options)
            .pipe(operators_1.map(function (data) {
            console.log(data);
            return data;
        }));
    };
    SettingsService.prototype.setSettingsData = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.post(environment_1.environment.apiUrl + "/admin/setting/save", data, options)
            .pipe(operators_1.map(function (data) {
            console.log(data);
            return data;
        }));
    };
    SettingsService.prototype.updateType = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.post(environment_1.environment.apiUrl + "/admin/setting/type", data, options)
            .pipe(operators_1.map(function (result) {
            if (result) {
                console.log(result);
            }
            return result;
        }));
    };
    SettingsService.prototype.setSettingsRouteData = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.post(environment_1.environment.apiUrl + "/admin/setting/route/save", data, options)
            .pipe(operators_1.map(function (result) {
            if (result) {
                console.log(result);
            }
            return result;
        }));
    };
    SettingsService.prototype.getLincenseData = function () {
        var options = this.authServ.getRequestOpions();
        return this.http.get(environment_1.environment.apiUrl + '/admin/setting/license', options);
    };
    SettingsService.prototype.getBillsData = function () {
        var options = this.authServ.getRequestOpions();
        return this.http.get(environment_1.environment.apiUrl + '/admin/setting/bill', options);
    };
    SettingsService.prototype.setBillsData = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.post(environment_1.environment.apiUrl + '/admin/setting/bill', data, options);
    };
    SettingsService.prototype.setLincenseData = function (data) {
        var options = this.authServ.getRequestOpions(true);
        return this.http.post(environment_1.environment.apiUrl + '/admin/setting/license', data, options);
    };
    SettingsService.prototype.pingAmi = function (data) {
        var options = this.authServ.getRequestOpions(true);
        return this.http.post(environment_1.environment.apiUrl + '/admin/setting/connection', data, options);
    };
    SettingsService.prototype.uploadfile = function (data, filetype) {
        var options = this.authServ.getRequestOpions(true);
        options['reportProgress'] = true;
        options['observe'] = 'events';
        if (filetype == 0)
            return this.http.post(environment_1.environment.apiUrl + '/admin/setting/uploadfile', data, options);
        else
            return this.http.post(environment_1.environment.apiUrl + '/admin/setting/queuefile', data, options);
    };
    SettingsService.prototype.removeLastFileData = function () {
        var options = this.authServ.getRequestOpions(true);
        return this.http.get(environment_1.environment.apiUrl + '/admin/setting/deleteall', options);
    };
    SettingsService.prototype.removeLastQFileData = function () {
        var options = this.authServ.getRequestOpions(true);
        return this.http.get(environment_1.environment.apiUrl + '/admin/setting/deletequeue', options);
    };
    SettingsService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient,
            authentication_service_1.AuthenticationService])
    ], SettingsService);
    return SettingsService;
}());
exports.SettingsService = SettingsService;
//# sourceMappingURL=settings.service.js.map