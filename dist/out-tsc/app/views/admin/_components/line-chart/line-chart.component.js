"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var coreui_plugin_chartjs_custom_tooltips_1 = require("@coreui/coreui-plugin-chartjs-custom-tooltips");
require("chartjs-plugin-labels");
var excel_service_1 = require("../../../../_services/excel.service");
var LineChartComponent = /** @class */ (function () {
    function LineChartComponent(excelService) {
        this.excelService = excelService;
        this.chartHsteps = 50;
        this.isTimeChart = false;
        this.datasets = [];
        this.contentTitle = "";
        this.lineChartMaxYAxes = 100;
        this.labels = new Array(this.chartHsteps).fill("");
        this.colors = [
            {
                //cpu
                backgroundColor: "rgba(255, 161, 181, 0.2)",
                borderColor: "rgba(255, 161, 181, 0.4)",
                pointBackgroundColor: "rgba(255, 161, 181, 0.4)",
                pointBorderColor: "rgba(255, 161, 181, 0.4)",
                pointHoverBackgroundColor: "rgba(255, 161, 181, 0.4)",
                pointHoverBorderColor: "rgba(148,159,177,0.8)"
            },
            {
                // ram
                backgroundColor: "rgba(77, 189, 116, 0.2)",
                borderColor: "rgba(77, 189, 116, 0.4)",
                pointBackgroundColor: "rgba(77, 189, 116, 0.4)",
                pointBorderColor: "rgba(77, 189, 116, 0.4)",
                pointHoverBackgroundColor: "rgba(77, 189, 116, 0.4)",
                pointHoverBorderColor: "rgba(148,159,177,0.8)"
            },
            {
                // swap
                backgroundColor: "rgba(255, 193, 7, 0.2)",
                borderColor: "rgba(255, 193, 7, 0.4)",
                pointBackgroundColor: "rgba(255, 193, 7, 0.4)",
                pointBorderColor: "rgba(255, 193, 7, 0.4)",
                pointHoverBackgroundColor: "rgba(255, 193, 7, 0.4)",
                pointHoverBorderColor: "rgba(77,83,96,1)"
            },
            {
                // active
                backgroundColor: "rgba(32, 168, 216, 0.2)",
                borderColor: "rgba(32, 168, 216, 0.4)",
                pointBackgroundColor: "rgba(32, 168, 216, 0.4)",
                pointBorderColor: "rgba(32, 168, 216, 0.4)",
                pointHoverBackgroundColor: "rgba(32, 168, 216, 0.4)",
                pointHoverBorderColor: "rgba(148,159,177,0.8)"
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType = "line";
    }
    LineChartComponent.prototype.ngOnInit = function () {
        var isTimeChart = this.isTimeChart;
        this.options = {
            responsive: true,
            loneJoin: "miter",
            bezierCurve: true,
            elements: {
                point: {
                    radius: 0
                },
                line: {
                    tension: 0
                }
            },
            tooltips: {
                fontFamily: "IRANSans",
                fontColor: "black",
                fontStyle: "bold",
                enabled: false,
                mode: "index",
                custom: coreui_plugin_chartjs_custom_tooltips_1.CustomTooltips,
                intersect: false,
                callbacks: {
                    label: function (tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
                        if (isTimeChart)
                            return label + ' : ' + new Date(tooltipItem.yLabel * 1000).toISOString().substr(11, 8);
                        else
                            return label + ' ' + tooltipItem.yLabel;
                    }
                }
            },
            hover: {
                mode: "nearest",
                intersect: true,
                fontFamily: "IRANSans",
                fontColor: "black",
                fontStyle: "bold",
                enabled: false,
                custom: coreui_plugin_chartjs_custom_tooltips_1.CustomTooltips,
                callbacks: {
                    label: function (tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || "";
                        if (label) {
                            label += ": ";
                        }
                        label += isNaN(tooltipItem.yLabel) ? "0" : tooltipItem.yLabel;
                        return label;
                    }
                }
            },
            legend: {
                labels: {
                    fontFamily: 'IRANSans',
                    fontColor: 'black',
                    fontStyle: 'bold'
                }
            },
            plugins: {
                labels: {
                    render: "value",
                    fontColor: ["green", "white", "red"],
                    precision: 2,
                    arc: true
                },
                formatter: function (value) {
                    if (isNaN(value)) {
                        return "";
                    }
                    return value;
                }
            },
            scales: {
                yAxes: [
                    {
                        id: "left-y-axis",
                        ticks: {
                            beginAtZero: true,
                            fontFamily: "IRANSans",
                            fontColor: "black",
                            fontSize: 13,
                            userCallback: function (item) {
                                if (isTimeChart)
                                    return new Date(item * 1000).toISOString().substr(11, 8);
                                else
                                    return item;
                            },
                        }
                    }
                ],
                xAxes: [
                    {
                        fontFamily: "IRANSans",
                        fontColor: "black",
                        ticks: {
                            beginAtZero: true,
                            stepSize: 0.5,
                            fontFamily: "IRANSans",
                            fontColor: "black",
                            fontSize: 13,
                        }
                    }
                ]
            },
        };
    };
    LineChartComponent.prototype.exportAsXLSX = function (data, type) {
        if (type === void 0) { type = "excel"; }
        this.excelService.exportAsExcelFile(data, this.lineChartType, type);
    };
    LineChartComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    LineChartComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    LineChartComponent.prototype.export = function (type) {
        if (type === void 0) { type = "excel"; }
        var data = [];
        data.push({
            "نام نمودار": this.contentTitle
        });
        data.push({
            labels: this.labels
        });
        var labelDataPeer = [];
        var tmpLineChartData = JSON.parse(JSON.stringify(this.datasets));
        for (var dataItem in this.labels) {
            var record = {};
            for (var index in tmpLineChartData) {
                record[tmpLineChartData[index].label] = tmpLineChartData[index]["data"].pop();
            }
            labelDataPeer.push(record);
        }
        for (var index in labelDataPeer) {
            data.push(labelDataPeer[index]);
        }
        debugger;
        this.exportAsXLSX(data, type);
    };
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], LineChartComponent.prototype, "isTimeChart", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Array)
    ], LineChartComponent.prototype, "datasets", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", String)
    ], LineChartComponent.prototype, "contentTitle", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Array)
    ], LineChartComponent.prototype, "labels", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Array)
    ], LineChartComponent.prototype, "colors", void 0);
    LineChartComponent = tslib_1.__decorate([
        core_1.Component({
            selector: "app-line-chart",
            templateUrl: "./line-chart.component.html",
            styleUrls: ["./line-chart.component.scss"]
        }),
        tslib_1.__metadata("design:paramtypes", [excel_service_1.ExcelService])
    ], LineChartComponent);
    return LineChartComponent;
}());
exports.LineChartComponent = LineChartComponent;
//# sourceMappingURL=line-chart.component.js.map