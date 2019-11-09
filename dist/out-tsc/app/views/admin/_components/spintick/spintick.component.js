"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var SpintickComponent = /** @class */ (function () {
    function SpintickComponent() {
        this.showSpinner = false;
        this.showTick = true;
    }
    SpintickComponent.prototype.ngOnInit = function () {
    };
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], SpintickComponent.prototype, "showSpinner", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], SpintickComponent.prototype, "showTick", void 0);
    SpintickComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'app-spintick',
            templateUrl: './spintick.component.html',
            styleUrls: ['./spintick.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], SpintickComponent);
    return SpintickComponent;
}());
exports.SpintickComponent = SpintickComponent;
//# sourceMappingURL=spintick.component.js.map