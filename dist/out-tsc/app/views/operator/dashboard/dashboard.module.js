"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ng2_charts_1 = require("ng2-charts/ng2-charts");
var dropdown_1 = require("ngx-bootstrap/dropdown");
var buttons_1 = require("ngx-bootstrap/buttons");
var dashboard_component_1 = require("./dashboard.component");
var dashboard_routing_module_1 = require("./dashboard-routing.module");
var sysinfo_service_1 = require("../_services/sysinfo.service");
var router_1 = require("@angular/router");
var authentication_service_1 = require("../../../_services/authentication.service");
var environment_production = true;
var DashboardModule = /** @class */ (function () {
    function DashboardModule(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    DashboardModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [
                forms_1.FormsModule,
                dashboard_routing_module_1.DashboardRoutingModule,
                ng2_charts_1.ChartsModule,
                dropdown_1.BsDropdownModule,
                buttons_1.ButtonsModule.forRoot(),
            ],
            providers: [sysinfo_service_1.SysinfoService],
            declarations: [dashboard_component_1.DashboardComponent]
        }),
        tslib_1.__metadata("design:paramtypes", [authentication_service_1.AuthenticationService, router_1.Router])
    ], DashboardModule);
    return DashboardModule;
}());
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=dashboard.module.js.map