"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
require("chartjs-plugin-labels");
var excel_service_1 = require("../../../../_services/excel.service");
var coreui_plugin_chartjs_custom_tooltips_1 = require("@coreui/coreui-plugin-chartjs-custom-tooltips");
var DoughnutChartComponent = /** @class */ (function () {
    function DoughnutChartComponent(excelService) {
        this.excelService = excelService;
        this.labels = ["در حال استفاده", "آزاد"];
        this.data = [0, 100];
        this.colors = [
            {
                backgroundColor: ["#f86c6b", "rgba(228, 229, 230, 0.63)"]
            }
        ];
        this.chartOptions = {
            scaleShowVerticalLines: true,
            barRoundness: 3,
            legend: {
                labels: {
                    fontFamily: "IRANSans",
                    fontColor: "black",
                    fontStyle: "bold"
                }
            },
            tooltips: {
                fontFamily: "IRANSans",
                fontColor: "black",
                fontStyle: "bold",
                enabled: false,
                custom: coreui_plugin_chartjs_custom_tooltips_1.CustomTooltips,
            },
            plugins: {
                labels: {
                    render: "percent",
                    precision: 2,
                    arc: true
                },
                formatter: function (value) {
                    if (isNaN(value)) {
                        return "";
                    }
                    return value;
                }
            }
        };
        this.doughnutChartType = "doughnut";
    }
    DoughnutChartComponent.prototype.ngOnInit = function () { };
    DoughnutChartComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    DoughnutChartComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    DoughnutChartComponent.prototype.export = function (type) {
        if (type === void 0) { type = "excel"; }
        var data = [];
        var labelDataPeer = [];
        var tmpLineChartData = JSON.parse(JSON.stringify(this.data));
        var record = {};
        for (var index in this.labels) {
            record[this.labels[index].replace(/\s/g, "_")] = this.data[index];
        }
        data.push(record);
        this.exportAsXLSX(data, type);
    };
    DoughnutChartComponent.prototype.exportAsXLSX = function (data, type) {
        if (type === void 0) { type = "excel"; }
        this.excelService.exportAsExcelFile(data, this.doughnutChartType, type);
    };
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Array)
    ], DoughnutChartComponent.prototype, "labels", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Array)
    ], DoughnutChartComponent.prototype, "data", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], DoughnutChartComponent.prototype, "colors", void 0);
    DoughnutChartComponent = tslib_1.__decorate([
        core_1.Component({
            selector: "app-doughnut-chart",
            templateUrl: "./doughnut-chart.component.html",
            styleUrls: ["./doughnut-chart.component.scss"],
            host: { class: "text-left" }
        }),
        tslib_1.__metadata("design:paramtypes", [excel_service_1.ExcelService])
    ], DoughnutChartComponent);
    return DoughnutChartComponent;
}());
exports.DoughnutChartComponent = DoughnutChartComponent;
//# sourceMappingURL=doughnut-chart.component.js.map