"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var user_management_component_1 = require("./user-management.component");
var user_management_routing_module_1 = require("./user-management-routing.module");
var new_user_component_1 = require("./new-user/new-user.component");
var users_component_1 = require("./users/users.component");
var tabs_1 = require("ngx-bootstrap/tabs");
var ngx_datatable_1 = require("@swimlane/ngx-datatable");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var forms_1 = require("@angular/forms");
var users_service_1 = require("./_services/users.service");
var roles_component_1 = require("./roles/roles.component");
var ng_multiselect_dropdown_1 = require("ng-multiselect-dropdown");
var core_2 = require("@angular/core");
var core_3 = require("@angular/core");
var UserManagementModule = /** @class */ (function () {
    function UserManagementModule() {
    }
    UserManagementModule = tslib_1.__decorate([
        core_1.NgModule({
            declarations: [
                user_management_component_1.UserManagementComponent,
                roles_component_1.RolesComponent,
                new_user_component_1.NewUserComponent,
                users_component_1.UsersComponent
            ],
            imports: [
                common_1.CommonModule,
                user_management_routing_module_1.UserManagementRoutingModule,
                tabs_1.TabsModule,
                forms_1.ReactiveFormsModule,
                ngx_datatable_1.NgxDatatableModule,
                ngx_bootstrap_1.ModalModule.forRoot(),
                ng_multiselect_dropdown_1.NgMultiSelectDropDownModule.forRoot()
            ],
            providers: [users_service_1.UsersService],
            schemas: [core_2.CUSTOM_ELEMENTS_SCHEMA, core_3.NO_ERRORS_SCHEMA]
        })
    ], UserManagementModule);
    return UserManagementModule;
}());
exports.UserManagementModule = UserManagementModule;
//# sourceMappingURL=user-management.module.js.map