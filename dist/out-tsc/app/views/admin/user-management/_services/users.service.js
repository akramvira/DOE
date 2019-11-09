"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var environment_1 = require("../../../../../environments/environment");
var authentication_service_1 = require("../../../../_services/authentication.service");
var httpOptions = {
    headers: new http_1.HttpHeaders({ "Content-Type": "application/json" })
};
var UsersService = /** @class */ (function () {
    function UsersService(http, authServ) {
        this.http = http;
        this.authServ = authServ;
    }
    UsersService.prototype.getAllUsers = function () {
        var options = this.authServ.getRequestOpions();
        return this.http.get(environment_1.environment.apiUrl + "/admin/users", options);
    };
    UsersService.prototype.addUser = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.post(environment_1.environment.apiUrl + "/admin/users", data, options);
    };
    //roles
    UsersService.prototype.getAllRoles = function () {
        var options = this.authServ.getRequestOpions();
        return this.http.get(environment_1.environment.apiUrl + "/admin/users/roles", options);
    };
    UsersService.prototype.removeRole = function (roleId) {
        var options = this.authServ.getRequestOpions();
        return this.http.delete(environment_1.environment.apiUrl + "/admin/users/roles/" + roleId, options);
    };
    UsersService.prototype.addRole = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.post(environment_1.environment.apiUrl + "/admin/users/roles", data, options);
    };
    UsersService.prototype.updateRole = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.put(environment_1.environment.apiUrl + "/admin/users/roles/" + data["id"], data, options);
    };
    UsersService.prototype.deleteRole = function (id) {
        var options = this.authServ.getRequestOpions();
        return this.http.delete(environment_1.environment.apiUrl + "/admin/users/roles/" + id, options);
    };
    UsersService.prototype.updateUser = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.put(environment_1.environment.apiUrl + "/admin/users/" + data["id"], data, options);
    };
    UsersService.prototype.deleteUser = function (id) {
        var options = this.authServ.getRequestOpions();
        return this.http.delete(environment_1.environment.apiUrl + "/admin/users/" + id, options);
    };
    UsersService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: "root"
        }),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient,
            authentication_service_1.AuthenticationService])
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map