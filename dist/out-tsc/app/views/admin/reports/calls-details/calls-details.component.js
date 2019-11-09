"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var reports_service_1 = require("../_service/reports.service");
var ngx_toastr_1 = require("ngx-toastr");
var authentication_service_1 = require("../../../../_services/authentication.service");
var ngx_datatable_1 = require("@swimlane/ngx-datatable");
var forms_1 = require("@angular/forms");
var daterange_component_1 = require("../_components/daterange/daterange.component");
var CallsDetailsComponent = /** @class */ (function () {
    function CallsDetailsComponent(reportServ, authServ, toastr) {
        this.reportServ = reportServ;
        this.authServ = authServ;
        this.toastr = toastr;
        this.page = new Page();
        this.storedData = [];
        //pagination
        this.loadingData = false;
        this.tempData = [];
        this.filtersData = new forms_1.FormGroup({
            disposition: new forms_1.FormControl("all"),
            src: new forms_1.FormControl(""),
            dst: new forms_1.FormControl(""),
            dest: new forms_1.FormControl(""),
            sort: new forms_1.FormControl([])
        });
    }
    CallsDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.reportServ.getCallsDetails().subscribe(function (data) {
            console.log(data);
            _this.showData(data);
        }, function (error) {
            _this.authServ.handdleAuthErrors(error);
        });
    };
    CallsDetailsComponent.prototype.showData = function (data, page) {
        if (page === void 0) { page = 0; }
        this.data = data["data"];
        this.storedData = data["data"];
        this.page.pageNumber = page;
        this.page.size = data["per_page"];
        this.page.totalElements = data["total"];
        this.page.totalPages = data["last_page"];
    };
    CallsDetailsComponent.prototype.filterData = function () {
        var _this = this;
        this.loadingData = true;
        var data = this.filtersData.getRawValue();
        data.from = this.daterange.selectedDateFrom.value;
        data.to = this.daterange.selectedDateTo.value;
        this.reportServ.filterCallsDetails(data).subscribe(function (data) {
            _this.showData(data);
            _this.loadingData = false;
        }, function (error) {
            _this.authServ.handdleAuthErrors(error);
            _this.loadingData = false;
        });
    };
    CallsDetailsComponent.prototype.setPage = function (pageInfo) {
        var _this = this;
        pageInfo.offset;
        var data = this.filtersData.getRawValue();
        data.from = this.daterange.selectedDateFrom.value;
        data.to = this.daterange.selectedDateTo.value;
        data.page = pageInfo.offset + 1;
        this.loadingData = true;
        this.reportServ.filterCallsDetails(data).subscribe(function (pagedData) {
            _this.loadingData = false;
            _this.showData(pagedData, pageInfo.offset);
        }, function (error) {
            _this.authServ.handdleAuthErrors(error);
            _this.loadingData = false;
        });
    };
    Object.defineProperty(CallsDetailsComponent.prototype, "getData", {
        get: function () {
            return this.storedData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CallsDetailsComponent.prototype, "setData", {
        set: function (filteredData) {
            this.data = filteredData;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        core_1.ViewChild(ngx_datatable_1.DatatableComponent),
        tslib_1.__metadata("design:type", ngx_datatable_1.DatatableComponent)
    ], CallsDetailsComponent.prototype, "myTable", void 0);
    tslib_1.__decorate([
        core_1.ViewChild("daterange"),
        tslib_1.__metadata("design:type", daterange_component_1.DaterangeComponent)
    ], CallsDetailsComponent.prototype, "daterange", void 0);
    CallsDetailsComponent = tslib_1.__decorate([
        core_1.Component({
            selector: "app-calls-details",
            templateUrl: "./calls-details.component.html",
            styleUrls: ["./calls-details.component.scss"]
        }),
        tslib_1.__metadata("design:paramtypes", [reports_service_1.ReportsService,
            authentication_service_1.AuthenticationService,
            ngx_toastr_1.ToastrService])
    ], CallsDetailsComponent);
    return CallsDetailsComponent;
}());
exports.CallsDetailsComponent = CallsDetailsComponent;
var Page = /** @class */ (function () {
    function Page() {
        //The number of elements in the page
        this.size = 0;
        //The total number of elements
        this.totalElements = 0;
        //The total number of pages
        this.totalPages = 0;
        //The current page number
        this.pageNumber = 0;
    }
    return Page;
}());
//# sourceMappingURL=calls-details.component.js.map