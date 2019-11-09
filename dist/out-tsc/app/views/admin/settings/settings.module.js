"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var settings_component_1 = require("./settings.component");
var settings_routing_module_1 = require("./settings-routing.module");
var tabs_1 = require("ngx-bootstrap/tabs");
var forms_1 = require("@angular/forms");
var file_upload_component_1 = require("./file-upload/file-upload.component");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var components_module_1 = require("../_components/components/components.module");
var SettingsModule = /** @class */ (function () {
    function SettingsModule() {
    }
    SettingsModule = tslib_1.__decorate([
        core_1.NgModule({
            declarations: [
                settings_component_1.SettingsComponent,
                file_upload_component_1.FileUploadComponent
            ],
            imports: [
                common_1.CommonModule,
                settings_routing_module_1.SettingsRoutingModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                tabs_1.TabsModule,
                ngx_bootstrap_1.ProgressbarModule.forRoot(),
                components_module_1.ComponentsModule,
                ngx_bootstrap_1.ModalModule.forRoot()
            ],
            schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
            providers: [file_upload_component_1.FileUploadComponent]
        })
    ], SettingsModule);
    return SettingsModule;
}());
exports.SettingsModule = SettingsModule;
//# sourceMappingURL=settings.module.js.map