"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var groups_routing_module_1 = require("./groups-routing.module");
var groups_component_1 = require("./groups.component");
var ngx_datatable_1 = require("@swimlane/ngx-datatable");
var forms_1 = require("@angular/forms");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var assistant_component_1 = require("./assistant/assistant.component");
var office_component_1 = require("./office/office.component");
var lines_component_1 = require("./lines/lines.component");
var GroupsModule = /** @class */ (function () {
    function GroupsModule() {
    }
    GroupsModule = tslib_1.__decorate([
        core_1.NgModule({
            declarations: [
                groups_component_1.GroupsComponent,
                assistant_component_1.AssistantComponent,
                office_component_1.OfficeComponent,
                lines_component_1.LinesComponent,
            ],
            imports: [
                common_1.CommonModule,
                groups_routing_module_1.GroupsRoutingModule,
                ngx_datatable_1.NgxDatatableModule,
                ngx_bootstrap_1.ModalModule.forRoot(),
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule
            ],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
        })
    ], GroupsModule);
    return GroupsModule;
}());
exports.GroupsModule = GroupsModule;
//# sourceMappingURL=groups.module.js.map