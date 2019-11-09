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
    WebService.prototype.getAllGroups = function () {
        var options = this.authServ.getRequestOpions();
        return this.http.get(environment_1.environment.apiUrl + '/admin/groups/extensions', options);
    };
    WebService.prototype.removeGroup = function (groupId) {
        var options = this.authServ.getRequestOpions();
        return this.http.delete(environment_1.environment.apiUrl + '/admin/groups/extensions/' + groupId, options);
    };
    WebService.prototype.addGroup = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.post(environment_1.environment.apiUrl + '/admin/groups/extensions', data, options);
    };
    WebService.prototype.updateGroup = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.put(environment_1.environment.apiUrl + '/admin/groups/extensions/' + data['id'], data, options);
    };
    WebService.prototype.deleteGroup = function (id) {
        var options = this.authServ.getRequestOpions();
        return this.http.delete(environment_1.environment.apiUrl + '/admin/groups/extensions/' + id, options);
    };
    WebService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient, authentication_service_1.AuthenticationService])
    ], WebService);
    return WebService;
}());
exports.WebService = WebService;
//# sourceMappingURL=web.service.js.map