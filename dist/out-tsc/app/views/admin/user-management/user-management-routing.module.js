"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var new_user_component_1 = require("./new-user/new-user.component");
var user_management_component_1 = require("./user-management.component");
var users_component_1 = require("./users/users.component");
var roles_component_1 = require("./roles/roles.component");
var auth_guard_service_1 = require("../../../_services/auth-guard.service");
var routes = [
    {
        path: '',
        component: user_management_component_1.UserManagementComponent,
        data: {
            title: 'مدیریت کاربران'
        },
        children: [
            {
                path: '',
                redirectTo: 'users',
                pathMatch: 'full'
            },
            {
                path: "new-user",
                component: new_user_component_1.NewUserComponent,
                data: {
                    title: ' ایجاد کاربر جدید'
                }
            },
            {
                path: "users",
                component: users_component_1.UsersComponent,
                data: {
                    title: 'نمایش کاربران'
                }
            },
            {
                path: "roles",
                component: roles_component_1.RolesComponent,
                data: {
                    title: 'مقام ها',
                    accessName: 'userRols'
                },
                canActivate: [auth_guard_service_1.AuthGuardService],
            }
        ]
    }
];
var UserManagementRoutingModule = /** @class */ (function () {
    function UserManagementRoutingModule() {
    }
    UserManagementRoutingModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], UserManagementRoutingModule);
    return UserManagementRoutingModule;
}());
exports.UserManagementRoutingModule = UserManagementRoutingModule;
//# sourceMappingURL=user-management-routing.module.js.map