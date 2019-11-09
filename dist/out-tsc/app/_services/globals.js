"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var authentication_service_1 = require("./authentication.service");
var core_1 = require("@angular/core");
var Globals = /** @class */ (function () {
    function Globals(authServ) {
        this.authServ = authServ;
    }
    Globals.fetchData = function (data, keysIsId) {
        if (keysIsId === void 0) { keysIsId = false; }
        var finalData = [];
        for (var i in data) {
            if (keysIsId)
                finalData.push(i);
            else
                finalData.push(data[i]["id"]);
        }
        return finalData.join(",");
    };
    Globals = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [authentication_service_1.AuthenticationService])
    ], Globals);
    return Globals;
}());
exports.Globals = Globals;
//# sourceMappingURL=globals.js.map