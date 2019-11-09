"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var excel_service_1 = require("../../../../_services/excel.service");
var PieChartComponent = /** @class */ (function () {
    function PieChartComponent(excelService) {
        this.excelService = excelService;
        this.contentTitle = "";
        this.data = [1, 100];
        this.labels = ["پاسخ داده نشده", "پاسخ داده شده"];
        this.colors = [
            {
                backgroundColor: ["#20a8d8", "#e6e6e6"]
            }
        ];
        this.chartOptions = {
            scaleShowVerticalLines: false,
            responsive: true,
            legend: {
                labels: {
                    fontFamily: 'IRANSans',
                    fontColor: 'black',
                    fontStyle: 'bold'
                }
            },
        };
        this.chartType = "pie";
    }
    PieChartComponent.prototype.ngOnInit = function () {
    };
    PieChartComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    PieChartComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    PieChartComponent.prototype.export = function (type) {
        if (type === void 0) { type = "excel"; }
        var data = [];
        var labelDataPeer = [];
        var tmpLineChartData = JSON.parse(JSON.stringify(this.data));
        var record = {};
        for (var index in this.labels) {
            debugger;
            record[this.labels[index].replace(/\s/g, "_")] = this.data[index];
        }
        data.push(record);
        debugger;
        this.exportAsXLSX(data, type);
    };
    PieChartComponent.prototype.exportAsXLSX = function (data, type) {
        if (type === void 0) { type = "excel"; }
        this.excelService.exportAsExcelFile(data, this.chartType, type);
    };
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", String)
    ], PieChartComponent.prototype, "contentTitle", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Array)
    ], PieChartComponent.prototype, "data", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Array)
    ], PieChartComponent.prototype, "labels", void 0);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", Array)
    ], PieChartComponent.prototype, "colors", void 0);
    PieChartComponent = tslib_1.__decorate([
        core_1.Component({
            selector: "app-pie-chart",
            templateUrl: "./pie-chart.component.html",
            styleUrls: ["./pie-chart.component.scss"]
        }),
        tslib_1.__metadata("design:paramtypes", [excel_service_1.ExcelService])
    ], PieChartComponent);
    return PieChartComponent;
}());
exports.PieChartComponent = PieChartComponent;
//# sourceMappingURL=pie-chart.component.js.map