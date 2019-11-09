"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var ngx_toastr_1 = require("ngx-toastr");
var authentication_service_1 = require("../../../../_services/authentication.service");
var ngx_datatable_1 = require("@swimlane/ngx-datatable");
var forms_1 = require("@angular/forms");
var moment = require("jalali-moment");
var daterange_component_1 = require("../_components/daterange/daterange.component");
var web_service_1 = require("./web.service");
var QueuesComponent = /** @class */ (function () {
    function QueuesComponent(reportServ, authServ, toastr) {
        this.reportServ = reportServ;
        this.authServ = authServ;
        this.toastr = toastr;
        this.page = new Page();
        //rows = new Array<CorporateEmployee>();
        this.timesBarChartData = [
            { data: [], label: "" },
            { data: [], label: "" }
        ];
        this.callsBarChartData = [
            { data: [], label: "" },
            { data: [], label: "" },
            { data: [], label: "" }
        ];
        this.serviceLevelbarChartData = [{ data: [], label: "" }];
        this.storedData = [];
        this.queueId = new forms_1.FormControl();
        this.mainLabels = [];
        this.tempData = [];
        this.dateObject = moment("1395-11-22", "jYYYY,jMM,jDD");
        this.selectedDateFrom = new forms_1.FormControl("");
        this.selectedDateTo = new forms_1.FormControl("");
        this.disposition = new forms_1.FormControl("all");
        this.src = new forms_1.FormControl("");
        this.dest = new forms_1.FormControl("");
        this.datePickerConfig = {
            format: "jYYYY/MM/DD",
            theme: "dp-material",
            unSelectOnClick: true,
            showGoToCurrent: true,
            drops: "left"
        };
        this.filter = {
            from: this.selectedDateFrom.value,
            to: this.selectedDateTo.value,
            dst: "",
            src: "",
            disposition: ""
        };
        this.detailsLabels = [];
        this.timesBarChartDataDetails = [
            { data: [], label: "" },
            { data: [], label: "" }
        ];
        this.callsBarChartDataDetails = [
            { data: [], label: "" },
            { data: [], label: "" },
            { data: [], label: "" }
        ];
        this.serviceLevelbarChartDataDetails = [{ data: [], label: "" }];
    }
    QueuesComponent.prototype.ngOnInit = function () {
        this.getGeneralChartData();
    };
    QueuesComponent.prototype.toggleExpandRow = function (row) {
        this.table.rowDetail.toggleExpandRow(row);
    };
    QueuesComponent.prototype.filterData = function () {
        this.filter.from = this.selectedDateFrom.value;
        this.filter.to = this.selectedDateTo.value;
        // this.reportServ.filterCallsDetails(this.filter).subscribe(
        //   (data)=>{
        //   this.showData(data);
        //   },
        //   (error)=>{});
    };
    QueuesComponent.prototype.onDetailToggle = function (event) { };
    //pagination
    QueuesComponent.prototype.setPage = function (pageInfo) {
        this.page.pageNumber = pageInfo.offset + 1;
        this.filterData();
        //this.page.size= pageInfo[''];
        // this.page.totalElements=100;
        // this.page.totalPages=10;
        //this.serverResultsService.getResults(this.page).subscribe(pagedData => {
        //this.page = {size:2,};//pagedData.page;
        //this.users = 4;//pagedData.data;
        // });
    };
    QueuesComponent.prototype.FilterData = function (event) {
        this.tempData = JSON.parse(JSON.stringify(this.storedData));
        var columnName = event.currentTarget.id;
        var val = event.target.value.toLowerCase();
        this.filter[columnName] = val;
        this.filterData();
    };
    QueuesComponent.prototype.onSelectDate = function () {
        this.filterData();
    };
    Object.defineProperty(QueuesComponent.prototype, "getData", {
        get: function () {
            return this.storedData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QueuesComponent.prototype, "setData", {
        set: function (filteredData) {
            this.queueData = filteredData;
        },
        enumerable: true,
        configurable: true
    });
    QueuesComponent.prototype.getGeneralChartData = function () {
        var _this = this;
        var data = {
            from: this.daterange.selectedDateFrom.value,
            to: this.daterange.selectedDateTo.value
        };
        this.mainLabels = [];
        var labels = [];
        for (var i in this.queueData) {
            labels.push(this.queueData[i]["name"]);
        }
        this.mainLabels = labels;
        this.reportServ.gerChartsData(data).subscribe(function (data) {
            data = data["data"];
            var noanswer = [];
            var answer = [];
            var busy = [];
            var performance = [];
            var time = [];
            var ringTime = [];
            var arrayData = [];
            _this.mainLabels = [];
            for (var i in data) {
                _this.queueId.setValue(data[i]["id"]);
                _this.mainLabels.push(data[i]["name"]);
                arrayData.push(tslib_1.__assign({ id: data[i]["id"], name: data[i]["name"] }, data[i]["data"], { agents: data[i]["agents"] }));
                noanswer.push(data[i]["data"]["noanswer"]);
                answer.push(data[i]["data"]["answer"]);
                busy.push(data[i]["data"]["busy"]);
                performance.push(data[i]["data"]["performance"]);
                time.push(data[i]["data"]["time"]);
                ringTime.push(data[i]["data"]["ringTime"]);
            }
            _this.queueData = arrayData;
            //this.setPage(data);
            //time chart-----------------------------------
            _this.timesBarChartData = [];
            _this.timesBarChartData = [
                { data: ringTime, label: "مدت زمان انتظار" },
                { data: time, label: "مدت زمان مکالمه" }
            ];
            //answer no answer data--------------------
            _this.callsBarChartData = [
                { data: answer, label: "تعداد تماس های پاسخ داده شده" },
                { data: noanswer, label: "تعداد تماس های پاسخ داده نشده" },
                { data: busy, label: "تعداد تماس های مشغول" }
            ];
            //---performance----------------------------------
            _this.serviceLevelbarChartData = [
                { data: performance, label: "درصد سرویس دهی" }
            ];
        }, function (error) {
            _this.authServ.handdleAuthErrors(error);
        });
    };
    QueuesComponent.prototype.submitDetailedChartsFilter = function () {
        var _this = this;
        var data = {
            from: this.filter.from = this.daterangeDetailsChart.selectedDateFrom.value,
            to: this.filter.to = this.daterangeDetailsChart.selectedDateTo.value,
            id: this.queueId.value,
            time: -1
        };
        this.detailsLabels = [];
        var labels = [];
        var itemSelected = this.queueData.forEach(function (item) {
            if (item.id == _this.queueId.value) {
                for (var i in item['agents'])
                    labels.push(item['agents'][i]["name"]);
            }
        });
        if (labels.length)
            this.detailsLabels = labels;
        else
            this.detailsLabels = [];
        this.reportServ.gerChartsDetailsData(data).subscribe(function (data) {
            data = data["data"];
            var noanswer = [];
            var answer = [];
            var busy = [];
            var performance = [];
            var time = [];
            var ringTime = [];
            var arrayData = [];
            _this.detailsLabels = [];
            for (var i in data) {
                _this.detailsLabels.push(data[i]["name"]);
                arrayData.push(tslib_1.__assign({ id: data[i]["id"], name: data[i]["name"] }, data[i]["data"], { agents: data[i]["agents"] }));
                noanswer.push(data[i]["data"]["noanswer"]);
                answer.push(data[i]["data"]["answer"]);
                busy.push(data[i]["data"]["busy"]);
                performance.push(data[i]["data"]["performance"]);
                time.push(data[i]["data"]["time"]);
                ringTime.push(data[i]["data"]["ringtime"]);
            }
            //console.log(detailsLabels);
            //this.queueData = arrayData;
            //this.setPage(data);
            //time chart-----------------------------------
            _this.timesBarChartDataDetails = [];
            _this.timesBarChartDataDetails = [
                { data: ringTime, label: "مدت زمان انتظار" },
                { data: time, label: "مدت زمان مکالمه" }
            ];
            //answer no answer data--------------------
            _this.callsBarChartDataDetails = [
                { data: answer, label: "تعداد تماس های پاسخ داده شده" },
                { data: noanswer, label: "تعداد تماس های پاسخ داده نشده" },
                { data: busy, label: "تعداد تماس های مشغول" }
            ];
            //---performance----------------------------------
            _this.serviceLevelbarChartDataDetails = [
                { data: performance, label: "درصد سرویس دهی" }
            ];
        }, function (error) {
            _this.authServ.handdleAuthErrors(error);
        });
    };
    tslib_1.__decorate([
        core_1.ViewChild("daterange"),
        tslib_1.__metadata("design:type", daterange_component_1.DaterangeComponent)
    ], QueuesComponent.prototype, "daterange", void 0);
    tslib_1.__decorate([
        core_1.ViewChild("queuesTable"),
        tslib_1.__metadata("design:type", Object)
    ], QueuesComponent.prototype, "table", void 0);
    tslib_1.__decorate([
        core_1.ViewChild(ngx_datatable_1.DatatableComponent),
        tslib_1.__metadata("design:type", ngx_datatable_1.DatatableComponent)
    ], QueuesComponent.prototype, "myTable", void 0);
    tslib_1.__decorate([
        core_1.ViewChild("daterangeDetailsChart"),
        tslib_1.__metadata("design:type", daterange_component_1.DaterangeComponent)
    ], QueuesComponent.prototype, "daterangeDetailsChart", void 0);
    QueuesComponent = tslib_1.__decorate([
        core_1.Component({
            selector: "app-queues",
            templateUrl: "./queues.component.html",
            styleUrls: ["./queues.component.scss"],
            encapsulation: core_1.ViewEncapsulation.None
        }),
        tslib_1.__metadata("design:paramtypes", [web_service_1.WebService,
            authentication_service_1.AuthenticationService,
            ngx_toastr_1.ToastrService])
    ], QueuesComponent);
    return QueuesComponent;
}());
exports.QueuesComponent = QueuesComponent;
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
//# sourceMappingURL=queues.component.js.map