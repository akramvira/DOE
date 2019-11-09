"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var settings_component_1 = require("./settings/settings.component");
var admin_component_1 = require("./admin.component");
var profile_component_1 = require("./profile/profile.component");
var auth_guard_service_1 = require("../../_services/auth-guard.service");
var authentication_service_1 = require("../../_services/authentication.service");
var routes = [
    {
        path: '',
        component: admin_component_1.AdminComponent,
        redirectTo: 'dashboard'
    },
    {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        data: { title: 'داشبورد مدیریت', accessName: 'dashboard' },
        canActivate: [auth_guard_service_1.AuthGuardService],
    },
    {
        path: 'settings',
        component: settings_component_1.SettingsComponent,
        data: { title: 'تنظیمات اولیه سیستم', accessName: 'setting' },
        canActivate: [auth_guard_service_1.AuthGuardService],
    },
    {
        path: 'users-management',
        loadChildren: './user-management/user-management.module#UserManagementModule',
        data: { title: 'مدیریت کاربران', accessName: 'users' },
        canActivate: [auth_guard_service_1.AuthGuardService]
    },
    {
        path: 'groups',
        loadChildren: './groups/groups.module#GroupsModule',
        data: { title: 'مدیریت گروه بندی ها', accessName: 'groupExtensions' },
        canActivate: [auth_guard_service_1.AuthGuardService]
    },
    {
        path: 'reports',
        loadChildren: './reports/reports.module#ReportsModule',
        data: { title: 'گزارشات', accessName: 'reports' },
        canActivate: [auth_guard_service_1.AuthGuardService]
    },
    {
        path: 'profile',
        component: profile_component_1.ProfileComponent,
        data: { title: 'اطلاعات کاربری' }
    }
];
var AdminRoutingModule = /** @class */ (function () {
    function AdminRoutingModule() {
    }
    AdminRoutingModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule],
            providers: [authentication_service_1.AuthenticationService]
        })
    ], AdminRoutingModule);
    return AdminRoutingModule;
}());
exports.AdminRoutingModule = AdminRoutingModule;
//# sourceMappingURL=admin-routing.module.js.map