"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var assistant_component_1 = require("./assistant/assistant.component");
var office_component_1 = require("./office/office.component");
var lines_component_1 = require("./lines/lines.component");
var routes = [
    {
        path: '',
        data: {
            title: 'مدیریت گروه بندی ها'
        },
        children: [
            { path: '', redirectTo: 'assistant', pathMatch: 'full' },
            { path: 'assistant', component: assistant_component_1.AssistantComponent, data: { title: 'مدیریت معاونت ها' } },
            { path: 'office', component: office_component_1.OfficeComponent, data: { title: 'مدیریت ادارات' } },
            { path: 'lines', component: lines_component_1.LinesComponent, data: { title: 'مدیریت داخلی ها' } },
        ]
    }
];
var GroupsRoutingModule = /** @class */ (function () {
    function GroupsRoutingModule() {
    }
    GroupsRoutingModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], GroupsRoutingModule);
    return GroupsRoutingModule;
}());
exports.GroupsRoutingModule = GroupsRoutingModule;
//# sourceMappingURL=groups-routing.module.js.map