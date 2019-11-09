"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var admin_component_1 = require("./admin.component");
var admin_routing_module_1 = require("./admin-routing.module");
var forms_1 = require("@angular/forms");
var settings_module_1 = require("./settings/settings.module");
var dashboard_module_1 = require("./dashboard/dashboard.module");
var profile_component_1 = require("./profile/profile.component");
var progressbar_1 = require("ngx-bootstrap/progressbar");
var ngx_datatable_1 = require("@swimlane/ngx-datatable");
var globals_1 = require("../../_services/globals");
var modal_1 = require("ngx-bootstrap/modal");
var ng2_charts_1 = require("ng2-charts");
var components_module_1 = require("./_components/components/components.module");
var AdminModule = /** @class */ (function () {
    function AdminModule() {
    }
    AdminModule = tslib_1.__decorate([
        core_1.NgModule({
            declarations: [admin_component_1.AdminComponent, profile_component_1.ProfileComponent],
            imports: [
                common_1.CommonModule,
                admin_routing_module_1.AdminRoutingModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                dashboard_module_1.DashboardModule,
                settings_module_1.SettingsModule,
                progressbar_1.ProgressbarModule,
                ngx_datatable_1.NgxDatatableModule,
                modal_1.ModalModule,
                ng2_charts_1.ChartsModule,
                components_module_1.ComponentsModule
            ],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
            providers: [globals_1.Globals]
        })
    ], AdminModule);
    return AdminModule;
}());
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map