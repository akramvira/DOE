"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var shared_service_1 = require("../../_services/shared.service");
var AdminComponent = /** @class */ (function () {
    function AdminComponent(sharedService) {
        this.sharedService = sharedService;
    }
    AdminComponent.prototype.ngOnInit = function () {
    };
    AdminComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'app-admin',
            templateUrl: './admin.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [shared_service_1.SharedService])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map