"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var coreui_plugin_chartjs_custom_tooltips_1 = require("@coreui/coreui-plugin-chartjs-custom-tooltips");
var excel_service_1 = require("../../../../_services/excel.service");
var BarChartComponent = /** @class */ (function () {
    function BarChartComponent(excelService) {
        this.excelService = excelService;
        this.isTimeChart = false;
        this.isPercentChart = false;
        // barChart1
        this.datasets = [
            {
                data: [78, 81, 80],
                label: "Series A"
            }
        ];
        this.contentTitle = "";
        this.labels = [];
        this.colors = [
            {
                backgroundColor: "rgba(77, 189, 116, 0.5)",
                borderColor: "rgba(77, 189, 116, 0.9)",
                borderWidth: 1,
            },
            {
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                borderColor: "rgba(255, 99, 132, 0.9)",
                borderWidth: 1,
            },
            {
                backgroundColor: "rgba(255, 193, 7, 0.6)",
                borderColor: "rgba(255, 193, 7, 0.9)",
                borderWidth: 1
            },
            {
                backgroundColor: "rgba(255, 100, 50, 0.6)",
                borderColor: "rgba(255, 193, 7, 0.9)",
                borderWidth: 1
            }
        ];
        this.chartType = "bar";
    }
    BarChartComponent.prototype.ngOnInit = function () {
        var isTimeChart = this.isTimeChart;
        var isPercentChart = this.isPercentChart;
        var stepSizee = 1;
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
                callbacks: {
                    label: function (tooltipItem, data) {
                        if (isTimeChart) {
                            var label = data.datasets[tooltipItem.datasetIndex].label || '';
                            if (isTimeChart)
                                return label + ' : ' + new Date(tooltipItem.yLabel * 1000).toISOString().substr(11, 8);
                            else
                                return label + ' ' + tooltipItem.yLabel;
                        }
                        else if (isPercentChart) {
                            var label = data.datasets[tooltipItem.datasetIndex].label || "";
                            if (label) {
                                label += ": ";
                            }
                            label += isNaN(tooltipItem.yLabel) ? "0" : tooltipItem.yLabel + '%';
                            return label;
                        }
                        else {
                            var label = data.datasets[tooltipItem.datasetIndex].label || "";
                            if (label) {
                                label += ": ";
                            }
                            label += isNaN(tooltipItem.yLabel) ? "0" : tooltipItem.yLabel;
                            return label;
                        }
                    }
                }
            },
            scales: {
                xAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            //this will fix your problem with NaN
                            callback: function (label, index, labels, data) {
                                return label ? label : "";
                            },
                            fontFamily: "IRANSans",
                            fontColor: "black",
                            fontSize: 13
                        },
                        barPercentage: 0.4
                    }
                ],
                yAxes: [
                    {
                        fontFamily: "IRANSans",
                        fontColor: "black",
                        fontStyle: "bold",
                        ticks: {
                            beginAtZero: true,
                            fontFamily: "IRANSans",
                            fontColor: "black",
                            fontSize: 13,
                            userCallback: function (item) {
                                if (isTimeChart)
                                    return new Date(item * 1000).toISOString().substr(11, 8);
                                else if (isPercentChart)
                                    return item + '%';
                                else
                                    return item;
                            },
                        }
                    }
                ]
            },
            plugins: {
                labels: {
                    render: "value",
                    precision: 2,
                    arc: true,
                    callback: function (item) { console.log(item); }
                },
                userCallback: function (value) {
                    console.log(value);
                    if (isNaN(value)) {
                        return "";
                    }
                    if (isTimeChart)
                        return new Date(value * 1000).toISOString().substr(11, 8);
                    else if (isPercentChart)
                        return value + '%';
                    else
                        return value;
                }
            }
        };
    };
    BarChartComponent.prototype.chartClicked = function (e) {
    };
    BarChartComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    BarChartComponent.prototype.formatTime = function (secs) {
        secs = parseInt(secs);
        var hours = Math.floor(secs / (60 * 60));
        var divisor_for_minutes = secs % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);
        var divisor_for_seconds = divisor_for_minutes % 60;
        var seconds = Math.ceil(divisor_for_seconds);
        return hours + ":" + minutes;
    };
    BarChartComponent.prototype.export = function (type) {
        if (type === void 0) { type = "excel"; }
        var tmpData = JSON.parse(JSON.stringify(this.datasets));
        var data = [];
        data.push({
            اطلاعات: this.contentTitle
        });
        for (var it_1 in tmpData) {
            var record = {};
            record["labels"] = tmpData[it_1]["label"];
            for (var index in this.labels) {
                record[this.labels[index].replace(/\s/g, "_")] =
                    tmpData[it_1]["data"][index]; // tmpData[it]['data'].pop();
            }
            data.push(record);
        }
        this.exportAsXLSX(data, type);
    };
    BarChartComponent.prototype.exportAsXLSX = function (data, type) {
        if (type === void 0) { type = "excel"; }
        this.excelService.exportAsExcelFile(data, this.chartType, type);
    };
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], BarChartComponent.prototype, "isTimeChart", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], BarChartComponent.prototype, "isPercentChart", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Array)
    ], BarChartComponent.prototype, "datasets", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", String)
    ], BarChartComponent.prototype, "contentTitle", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Array)
    ], BarChartComponent.prototype, "labels", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Array)
    ], BarChartComponent.prototype, "colors", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], BarChartComponent.prototype, "chartType", void 0);
    BarChartComponent = tslib_1.__decorate([
        core_1.Component({
            selector: "app-bar-chart",
            templateUrl: "./bar-chart.component.html",
            styleUrls: ["./bar-chart.component.scss"]
        }),
        tslib_1.__metadata("design:paramtypes", [excel_service_1.ExcelService])
    ], BarChartComponent);
    return BarChartComponent;
}());
exports.BarChartComponent = BarChartComponent;
//# sourceMappingURL=bar-chart.component.js.map