"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var bar_chart_component_1 = require("../bar-chart/bar-chart.component");
var line_chart_component_1 = require("../line-chart/line-chart.component");
var doughnut_chart_component_1 = require("../doughnut-chart/doughnut-chart.component");
var ng2_charts_1 = require("ng2-charts");
var pie_chart_component_1 = require("../pie-chart/pie-chart.component");
var spintick_component_1 = require("../spintick/spintick.component");
var loading_component_1 = require("../loading/loading.component");
var progressbar_component_1 = require("../progressbar/progressbar.component");
var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = tslib_1.__decorate([
        core_1.NgModule({
            declarations: [
                doughnut_chart_component_1.DoughnutChartComponent,
                line_chart_component_1.LineChartComponent,
                bar_chart_component_1.BarChartComponent,
                pie_chart_component_1.PieChartComponent,
                spintick_component_1.SpintickComponent,
                loading_component_1.LoadingComponent,
                progressbar_component_1.ProgressbarComponent
            ],
            imports: [
                common_1.CommonModule,
                ng2_charts_1.ChartsModule
            ],
            exports: [
                doughnut_chart_component_1.DoughnutChartComponent,
                line_chart_component_1.LineChartComponent,
                bar_chart_component_1.BarChartComponent,
                pie_chart_component_1.PieChartComponent,
                spintick_component_1.SpintickComponent,
                loading_component_1.LoadingComponent,
                progressbar_component_1.ProgressbarComponent
            ]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());
exports.ComponentsModule = ComponentsModule;
//# sourceMappingURL=components.module.js.map