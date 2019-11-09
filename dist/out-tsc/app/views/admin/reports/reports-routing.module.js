"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var all_component_1 = require("./performance-all/all.component");
var calls_details_component_1 = require("./calls-details/calls-details.component");
var queues_component_1 = require("./queues/queues.component");
var groups_bills_component_1 = require("./bills-groups/groups-bills.component");
var groups_component_1 = require("./performance-groups/groups.component");
var lines_component_1 = require("./performance-lines/lines.component");
var reports_component_1 = require("./reports.component");
var auth_guard_service_1 = require("../../../_services/auth-guard.service");
var operator_component_1 = require("./operator/operator.component");
var performance_l1_component_1 = require("./performance-l1/performance-l1.component");
var performance_l2_component_1 = require("./performance-l2/performance-l2.component");
var performance_l3_component_1 = require("./performance-l3/performance-l3.component");
var compare_all_component_1 = require("./compare-all/compare-all.component");
var routes = [
    { path: '',
        data: { title: 'گزارشات' },
        component: reports_component_1.ReportsComponent,
        children: [
            { path: '', redirectTo: 'all', pathMatch: 'full' },
            { path: 'all', component: all_component_1.AllComponent, data: { title: 'عملکرد کلی سیستم' } },
            { path: 'performance-l1', component: performance_l1_component_1.PerformanceL1Component, data: { title: 'عملکرد معاونت ها' } },
            { path: 'performance-l2', component: performance_l2_component_1.PerformanceL2Component, data: { title: 'عملکرد ادارات ' } },
            { path: 'performance-l3', component: performance_l3_component_1.PerformanceL3Component, data: { title: 'عملکرد داخلی ها ' } },
            { path: 'comapre-all', component: compare_all_component_1.CompareAllComponent, data: { title: ' مقایسه کلی ' } },
            { path: 'lines', component: lines_component_1.LinesComponent, data: { title: 'عملکرد داخلی ها' } },
            { path: 'groups', component: groups_component_1.GroupsComponent, data: { title: 'گروه ها' } },
            { path: 'groups-bills', component: groups_bills_component_1.GroupsBillsComponent, data: { title: 'قبوض گروه ها' } },
            { path: 'queues', component: queues_component_1.QueuesComponent, data: { title: 'وضعیت صف ها', accessName: 'queues' },
                canActivate: [auth_guard_service_1.AuthGuardService] },
            { path: 'operator', component: operator_component_1.OperatorComponent, data: { title: 'عملکرد اپراتور', accessName: 'operators' },
                canActivate: [auth_guard_service_1.AuthGuardService] },
            { path: 'calls-details', component: calls_details_component_1.CallsDetailsComponent, data: { title: 'ریز مکالمات سیستم' } },
        ]
    }
];
var ReportsRoutingModule = /** @class */ (function () {
    function ReportsRoutingModule() {
    }
    ReportsRoutingModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], ReportsRoutingModule);
    return ReportsRoutingModule;
}());
exports.ReportsRoutingModule = ReportsRoutingModule;
//# sourceMappingURL=reports-routing.module.js.map