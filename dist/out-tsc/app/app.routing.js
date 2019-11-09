"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
// Import Containers
var containers_1 = require("./containers");
var _404_component_1 = require("./views/error/404.component");
var _403_component_1 = require("./views/error/403.component");
var _500_component_1 = require("./views/error/500.component");
var login_component_1 = require("./views/login/login.component");
exports.routes = [
    {
        path: '',
        redirectTo: '/admin',
        /*canActivate : [AuthGuardService],*/
        pathMatch: 'full',
    },
    {
        path: 'admin',
        component: containers_1.DefaultLayoutComponent,
        data: {
            title: 'پنل مدیریت'
        },
        loadChildren: './views/admin/admin.module#AdminModule'
    },
    {
        path: 'operator',
        data: {
            title: 'پنل مدیریت'
        },
        loadChildren: './views/operator/operator.module#OperatorModule'
    },
    {
        path: '404',
        component: _404_component_1.P404Component,
        data: {
            title: 'صفحه 404'
        }
    },
    {
        path: '403',
        component: _403_component_1.P403Component,
        data: {
            title: 'صفحه 403'
        }
    },
    {
        path: '500',
        component: _500_component_1.P500Component,
        data: {
            title: 'صفحه 500'
        }
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent,
        data: {
            title: 'صفحه ورود'
        }
    },
    { path: '**', component: _404_component_1.P404Component }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(exports.routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app.routing.js.map