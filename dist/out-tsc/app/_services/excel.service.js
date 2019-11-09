"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var FileSaver = require("file-saver");
var XLSX = require("xlsx");
var EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
var EXCEL_EXTENSION = '.xlsx';
var ExcelService = /** @class */ (function () {
    function ExcelService() {
    }
    ExcelService.prototype.exportAsExcelFile = function (json, excelFileName, type) {
        if (type === void 0) { type = 'excel'; }
        var bookType;
        if (type == 'excel')
            bookType = 'xlsx';
        else
            bookType = 'csv';
        var worksheet = XLSX.utils.json_to_sheet(json);
        var workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        var excelBuffer = XLSX.write(workbook, { bookType: bookType, type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName, bookType);
    };
    ExcelService.prototype.saveAsExcelFile = function (buffer, fileName, type) {
        if (type === void 0) { type = 'xlsx'; }
        var data = new Blob([buffer], { type: EXCEL_TYPE });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + '.' + type);
    };
    ExcelService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], ExcelService);
    return ExcelService;
}());
exports.ExcelService = ExcelService;
//# sourceMappingURL=excel.service.js.map