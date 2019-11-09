"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var environment_1 = require("../../../../environments/environment");
var httpOptions = {
    headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' })
};
var SysinfoService = /** @class */ (function () {
    function SysinfoService(http) {
        this.http = http;
    }
    // Uses http.get() to load data from a single API endpoint
    SysinfoService.prototype.getSysInfo = function () {
        return this.http.get(environment_1.environment.apiUrl + '/dashboard');
    };
    SysinfoService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], SysinfoService);
    return SysinfoService;
}());
exports.SysinfoService = SysinfoService;
//# sourceMappingURL=sysinfo.service.js.map