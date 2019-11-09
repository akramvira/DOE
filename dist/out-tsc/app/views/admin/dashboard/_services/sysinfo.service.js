"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var environment_1 = require("../../../../../environments/environment");
var authentication_service_1 = require("../../../../_services/authentication.service");
var httpOptions = {
    headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' })
};
var SysinfoService = /** @class */ (function () {
    function SysinfoService(http, authServ) {
        this.http = http;
        this.authServ = authServ;
    }
    // Uses http.get() to load data from a single API endpoint
    SysinfoService.prototype.getSysInfo = function () {
        var options = this.authServ.getRequestOpions();
        return this.http.get(environment_1.environment.apiUrl + '/admin/dashboard', options);
        // no token 400
        // expired 403
        // invalide 403
        // user nabashe 404
    };
    SysinfoService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient, authentication_service_1.AuthenticationService])
    ], SysinfoService);
    return SysinfoService;
}());
exports.SysinfoService = SysinfoService;
//# sourceMappingURL=sysinfo.service.js.map