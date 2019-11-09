"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var LoadingComponent = /** @class */ (function () {
    function LoadingComponent() {
    }
    LoadingComponent.prototype.ngOnInit = function () {
    };
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], LoadingComponent.prototype, "showLoading", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", String)
    ], LoadingComponent.prototype, "text", void 0);
    LoadingComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'app-loading',
            templateUrl: './loading.component.html',
            styleUrls: ['./loading.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], LoadingComponent);
    return LoadingComponent;
}());
exports.LoadingComponent = LoadingComponent;
//# sourceMappingURL=loading.component.js.map