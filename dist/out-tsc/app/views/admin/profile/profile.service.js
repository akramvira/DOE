"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var environment_1 = require("../../../../environments/environment");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var authentication_service_1 = require("../../../_services/authentication.service");
var ProfileService = /** @class */ (function () {
    function ProfileService(http, authServ) {
        this.http = http;
        this.authServ = authServ;
    }
    ProfileService.prototype.getProfiledata = function () {
        debugger;
        var options = this.authServ.getRequestOpions();
        return this.http.get(environment_1.environment.apiUrl + '/admin/profile', options);
    };
    ProfileService.prototype.setProfileData = function (data) {
        var options = this.authServ.getRequestOpions();
        return this.http.post(environment_1.environment.apiUrl + "/admin/profile", data, options)
            .pipe(operators_1.map(function (data) {
            console.log(data);
            return data;
        }));
    };
    ProfileService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient,
            authentication_service_1.AuthenticationService])
    ], ProfileService);
    return ProfileService;
}());
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map