"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var environment_1 = require("../../../../../environments/environment");
var authentication_service_1 = require("../../../../_services/authentication.service");
var http_1 = require("@angular/common/http");
var GroupsService = /** @class */ (function () {
    function GroupsService(http, authServ) {
        this.http = http;
        this.authServ = authServ;
    }
    GroupsService.prototype.getAllGroups = function () {
        var options = this.authServ.getRequestOpions();
        return this.http.get(environment_1.environment.apiUrl + '/admin/groups', options);
    };
    GroupsService.prototype.removeGroup = function (groupId) {
        var options = this.authServ.getRequestOpions();
        return this.http.delete(environment_1.environment.apiUrl + '/admin/groups/' + groupId, options);
    };
    GroupsService.prototype.addGroup = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.post(environment_1.environment.apiUrl + '/admin/groups', data, options);
    };
    GroupsService.prototype.updateGroup = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.put(environment_1.environment.apiUrl + '/admin/groups/' + data['id'], data, options);
    };
    GroupsService.prototype.deleteGroup = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.delete(environment_1.environment.apiUrl + '/admin/groups/' + data['id'], options);
    };
    GroupsService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient, authentication_service_1.AuthenticationService])
    ], GroupsService);
    return GroupsService;
}());
exports.GroupsService = GroupsService;
//# sourceMappingURL=groups.service.js.map